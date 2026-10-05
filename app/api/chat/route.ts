import { NextRequest, NextResponse } from "next/server";
import { executeMultiModelChatStream, OPENROUTER_FREE_MODELS } from "@/lib/openrouter";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// In-memory sliding rate limiter per IP to protect from brute-force / abuse
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

export async function GET() {
  // Only expose public boolean status and public model catalog.
  // NO secret keys, lengths, or prefixes are ever exposed.
  const isOpenRouterConfigured = Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim() !== '');
  const activeModelName = isOpenRouterConfigured 
    ? (OPENROUTER_FREE_MODELS[0]?.name || "Qwen 3.8 27B") 
    : "Gemini 2.5 Flash";

  return NextResponse.json({
    openRouterConfigured: isOpenRouterConfigured,
    primaryEngine: isOpenRouterConfigured ? "OpenRouter Multi-Model (Failover)" : "Gemini Direct",
    activeModel: activeModelName,
    freeModels: OPENROUTER_FREE_MODELS.map(m => ({
      id: m.id,
      name: m.name,
      provider: m.provider,
      contextWindow: m.contextWindow,
      tag: m.tag
    })),
    status: "active"
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting check
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const clientIp = forwardedFor.split(',')[0].trim();

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { text: "Limite de requisições por minuto atingido. Aguarde instantes para enviar novas mensagens." },
        { status: 429 }
      );
    }

    const { message, history } = await req.json();

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ text: "A mensagem não pode estar vazia." }, { status: 400 });
    }

    const cleanInput = message.trim();

    // 2. Defense-in-depth: Reject or defuse prompt injection attempts asking for system secrets
    const suspiciousKeyPatterns = /(?:process\.env|api[_-]?key|sk-or-|sk-[a-z0-9]|openrouter_key|gemini_key|system\s*prompt|env\s*var)/i;
    if (suspiciousKeyPatterns.test(cleanInput)) {
      // Immediate clean rejection without calling external APIs
      return NextResponse.json({
        text: "Como assistente executivo, posso esclarecer apenas dúvidas sobre as competências, projetos e trajetória de Ygor Teixeira."
      });
    }

    const messagesList: { role: 'user' | 'assistant'; text: string }[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history) {
        if (h && typeof h.text === 'string' && (h.role === 'user' || h.role === 'assistant')) {
          // Never forward oversized messages
          messagesList.push({ role: h.role, text: h.text.slice(0, 300) });
        }
      }
    }
    messagesList.push({ role: 'user', text: cleanInput.slice(0, 300) });

    const result = await executeMultiModelChatStream({
      messages: messagesList
    });

    return new Response(result.stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        // Sanitize headers to only contain display-friendly strings
        'X-Model-Used': encodeURIComponent(result.modelUsed),
        'X-Model-Id': encodeURIComponent(result.modelId),
        'X-Provider': encodeURIComponent(result.provider),
        'X-Attempted-Models': encodeURIComponent(result.attemptedModels.join(', '))
      }
    });
  } catch (error: any) {
    // Sanitized logging on server side - NO credentials or raw stack forwarded to client
    const safeErrorMsg = error?.status ? `HTTP ${error.status}` : 'Internal error';
    console.error(`[Chat API Server Error] ${safeErrorMsg}`);

    let fallbackText = "Estou com dificuldades técnicas no momento. Tente novamente mais tarde.";
    if (error?.status === 429 || error?.message?.includes("429")) {
      fallbackText = "A taxa de requisições está momentaneamente alta. O sistema tentou alternar entre os modelos gratuitos, aguarde alguns instantes e tente novamente.";
    } else if (error?.status === 503 || error?.message?.includes("503") || error?.message?.includes("UNAVAILABLE")) {
      fallbackText = "No momento estou recebendo muitas mensagens. Por favor, aguarde alguns instantes e tente novamente.";
    }

    return NextResponse.json(
      { text: fallbackText },
      { status: 503 }
    );
  }
}
