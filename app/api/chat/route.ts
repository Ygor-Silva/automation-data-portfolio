import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const systemInstruction = "Você é um assistente virtual para ajudar visitantes a tirarem dúvidas sobre a experiência profissional, as habilidades e os projetos de Ygor Teixeira (o dono deste portfólio).\n" +
"Seja prestativo, educado e amigável. Use um tom profissional mas acessível.\n" +
"GUIA DE ESTILO RIGOROSO:\n" +
"- IMPORTANTE: SEJA EXTREMAMENTE BREVE E DIRETO. Suas mensagens não devem exceder 3 linhas de texto em um dispositivo móvel.\n" +
"- Use EXCLUSIVAMENTE bullet points (marcadores curtos de hífen) e no máximo 1 ou 2 sintagmas curtos antes da lista.\n" +
"- Remova parágrafos longos, introduções e conclusões desnecessárias.\n" +
"- USE MARKDOWN para estruturar a resposta.\n" +
"- Destaque termos técnicos, empresas e conceitos chave em **negrito** (ex: **RPA**, **Supabase**, **TypeScript**).\n" +
"- Agilidade e eficiência são sua prioridade.";

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API Key is not configured." },
        { status: 500 }
      );
    }

    let fullPrompt = message;
    if (history && history.length > 0) {
        const formattedHistory = history.map((h: any) => `${h.role === 'user' ? 'Visitante' : 'Assistente'}: ${h.text}`).join('\n');
        fullPrompt = `Histórico da conversa:\n${formattedHistory}\n\nVisitante diz agora: ${message}`;
    }

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction
      }
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive'
      }
    });
  } catch (error: any) {
    let fallbackText = "Estou com dificuldades técnicas no momento. Tente novamente mais tarde.";
    if (error?.status === 503 || error?.message?.includes("503") || error?.message?.includes("UNAVAILABLE")) {
      // transient error from high demand, handled gracefully
      fallbackText = "No momento estou recebendo muitas mensagens (alta demanda na API). Por favor, aguarde alguns instantes e tente novamente.";
    } else {
      console.error("Gemini API Error:", error.message || error);
    }

    return NextResponse.json(
      { text: fallbackText },
      { status: 503 } // Return an error state to be handled by the frontend
    );
  }
}
