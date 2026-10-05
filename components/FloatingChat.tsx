'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot, Cpu, Zap, Info, ShieldCheck, Sparkles, RefreshCw, Maximize2, Minimize2, User, CheckCheck, Copy, Check, RotateCcw, Clock, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isTyping?: boolean;
  modelUsed?: string;
  timestamp?: string;
}

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  contextWindow: string;
  tag: string;
}

// Inactivity timeout configuration: 3 minutes until check prompt, 1 minute grace until close
const INACTIVITY_PROMPT_MS = 3 * 60 * 1000;
const INACTIVITY_CLOSE_MS = 1 * 60 * 1000;

export default function FloatingChat({ lang = 'pt' }: { lang?: 'pt' | 'en' }) {
  const t = {
    pt: {
      welcome: 'Olá! Sou o **Ygor.AI**, assistente inteligente do portfólio profissional de Ygor Teixeira. Como posso ajudar você a conhecer as experiências dele em Business Intelligence (Power BI), automações de processos e sustentação de sistemas críticos?',
      empty: 'A mensagem não pode estar vazia.',
      tooLong: 'Perguntas com até 500 caracteres são ideais para uma resposta completa.',
      loadingErr: 'O servidor está iniciando ou alternando o modelo. Aguarde instantes.',
      fetchErr: 'Erro ao buscar a resposta. Tentando modelo alternativo...',
      defaultErr: 'Desculpe, ocorreu uma oscilação na conexão. Pode tentar novamente?',
      questions: [
        "Por que contratar o Ygor?",
        "Experiência com Power BI e SLAs?",
        "Projetos de automação e dados?",
        "Qual o contato direto para projetos?"
      ],
      inputPlaceholder: "Converse com o Ygor.AI sobre diferenciais, projetos e carreira...",
      askAssistant: "Fale com o Ygor.AI",
      closeChat: "Fechar chat",
      openChat: "Fale com o Ygor.AI",
      statusProcessing: "Digitando...",
      statusOnline: "Online",
      ecoTokens: "IA Adaptativa",
      autoFailover: "Auto-Failover Ativo",
      expandChat: "Expandir chat",
      minimizeChat: "Reduzir tamanho",
      modelDrawerTitle: "Roteamento Inteligente & Orquestração Multi-IA",
      modelDrawerDesc: "O sistema seleciona dinamicamente a melhor IA de acordo com a complexidade e exigência da pergunta — desde consultas ágeis até raciocínios analíticos de dados.",
      ecoNotice: "Cluster neural com failover automático e alta resiliência.",
      inactivityCheck: "Olá! Notei que você ficou ausente por um momento. Ainda tem alguma dúvida sobre a trajetória, Power BI ou projetos do Ygor? Se precisar de mais informações, estou por aqui!",
      inactivityClosed: "Como não houve interação recente, encerrei este atendimento para otimizar os recursos do assistente. Sempre que quiser tirar novas dúvidas, basta reiniciar a conversa abaixo!",
      sessionClosedBadge: "Atendimento encerrado por inatividade",
      sessionWarningBadge: "Aguardando resposta...",
      restartSession: "Reiniciar atendimento",
      continueSession: "Ainda estou aqui / Continuar"
    },
    en: {
      welcome: 'Hello! I am **Ygor.AI**, personal consultative assistant for Ygor Teixeira. How can I help you explore his achievements, skills, and projects in Power BI, SQL, mission-critical system support, and data automation?',
      empty: 'The message cannot be empty.',
      tooLong: 'Questions up to 500 characters are optimal for a thorough response.',
      loadingErr: 'The server is starting or switching models. Please wait.',
      fetchErr: 'Error fetching response. Cascading to fallback model...',
      defaultErr: 'Connection fluctuation detected. Please try again.',
      questions: [
        "Why hire Ygor?",
        "Experience with Power BI and SLAs?",
        "Automation and data projects?",
        "Direct contact for opportunities?"
      ],
      inputPlaceholder: "Talk with Ygor.AI about achievements, projects, and skills...",
      askAssistant: "Talk with Ygor.AI",
      closeChat: "Close chat",
      openChat: "Talk with Ygor.AI",
      statusProcessing: "Typing...",
      statusOnline: "Online",
      ecoTokens: "Adaptive AI",
      autoFailover: "Auto-Failover Active",
      expandChat: "Expand chat",
      minimizeChat: "Minimize chat",
      modelDrawerTitle: "Dynamic AI Routing & Multi-Engine Orchestration",
      modelDrawerDesc: "The system dynamically routes to the optimal AI model based on query complexity and analytical depth — from fast lookups to complex data engineering queries.",
      ecoNotice: "Neural cluster with automatic failover and high uptime.",
      inactivityCheck: "Hello! I noticed you've been away for a moment. Do you still have any questions about Ygor's career, Power BI expertise, or projects? I'm here if you'd like to continue!",
      inactivityClosed: "Due to inactivity, this chat session has been closed to optimize system resources. Whenever you wish to ask questions again, click below to restart the conversation!",
      sessionClosedBadge: "Session closed due to inactivity",
      sessionWarningBadge: "Awaiting response...",
      restartSession: "Restart conversation",
      continueSession: "I'm still here / Continue"
    }
  };

  const currentT = t[lang];

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModelsInfo, setShowModelsInfo] = useState(false);
  const [activeModel, setActiveModel] = useState<string>("NVIDIA: Nemotron 3 Ultra (free)");
  const [activeProvider, setActiveProvider] = useState<string>("OpenRouter (Free)");
  const [availableModels, setAvailableModels] = useState<ModelInfo[]>([
    { id: "nvidia/nemotron-3-ultra-550b-a55b:free", name: "NVIDIA: Nemotron 3 Ultra (free)", provider: "NVIDIA", contextWindow: "128k", tag: "Alta Performance & Precisão" },
    { id: "nvidia/nemotron-3-super-120b-a12b:free", name: "NVIDIA: Nemotron 3 Super (free)", provider: "NVIDIA", contextWindow: "128k", tag: "Análise Estratégica & BI" },
    { id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", name: "NVIDIA: Nemotron 3 Nano Omni (free)", provider: "NVIDIA", contextWindow: "32k", tag: "Raciocínio Rápido" },
    { id: "nvidia/nemotron-3.5-lightning:free", name: "NVIDIA: Nemotron 3.5 Lightning (free)", provider: "NVIDIA", contextWindow: "128k", tag: "Velocidade Extrema" },
    { id: "qwen/qwen3.8-27b:free", name: "Qwen: Qwen 3.8 27B (free)", provider: "Alibaba", contextWindow: "32k", tag: "SQL & Dados Estruturados" },
    { id: "google/gemma-4-26b-a4b-it:free", name: "Google: Gemma 4 26B (free)", provider: "Google", contextWindow: "128k", tag: "Linguagem Natural Fluida" },
    { id: "liquid/lfm-2.5-2.6b:free", name: "LiquidAI: LFM 2.5 (free)", provider: "Liquid AI", contextWindow: "32k", tag: "Ultra Rápido" },
    { id: "google/gemma-4-31b-it:free", name: "Google: Gemma 4 31B (free)", provider: "Google", contextWindow: "128k", tag: "Raciocínio Analítico" }
  ]);

  const getTimeString = () => {
    try {
      return new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit' }).format(new Date());
    } catch {
      const d = new Date();
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  };

  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const handleCopyMessage = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    }
  };

  const [sessionStatus, setSessionStatus] = useState<'active' | 'inactivity_warning' | 'closed'>('active');
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState<number>(() => Date.now());

  const resetActivityTimer = () => {
    setLastActivityTimestamp(Date.now());
    if (sessionStatus !== 'active') {
      setSessionStatus('active');
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'assistant',
    text: currentT.welcome,
    isTyping: false,
    timestamp: 'Agora'
  }]);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleRestartChat = () => {
    const time = getTimeString();
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        text: currentT.welcome,
        isTyping: false,
        timestamp: time
      }
    ]);
    setSessionStatus('active');
    setLastActivityTimestamp(Date.now());
    setInput('');
    setInputError(null);
  };

  // Inactivity monitoring effect
  useEffect(() => {
    if (!isOpen || isLoading) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastActivityTimestamp;

      // After 3 minutes of inactivity without user actions, prompt the user
      if (sessionStatus === 'active' && elapsed >= INACTIVITY_PROMPT_MS) {
        setSessionStatus('inactivity_warning');
        const time = getTimeString();
        setMessages((prev) => [
          ...prev,
          {
            id: 'inactivity-prompt-' + Date.now(),
            role: 'assistant',
            text: currentT.inactivityCheck,
            timestamp: time
          }
        ]);
      } else if (sessionStatus === 'inactivity_warning' && elapsed >= (INACTIVITY_PROMPT_MS + INACTIVITY_CLOSE_MS)) {
        // If still no interaction after 1 additional minute, close the conversation
        setSessionStatus('closed');
        const time = getTimeString();
        setMessages((prev) => [
          ...prev,
          {
            id: 'inactivity-closed-' + Date.now(),
            role: 'assistant',
            text: currentT.inactivityClosed,
            timestamp: time
          }
        ]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, isLoading, sessionStatus, lastActivityTimestamp, currentT.inactivityCheck, currentT.inactivityClosed]);

  // Fetch API status on mount
  useEffect(() => {
    fetch('/api/chat')
      .then((res) => res.json())
      .then((data) => {
        if (data.activeModel) {
          setActiveModel(data.activeModel);
        }
        if (data.freeModels && Array.isArray(data.freeModels)) {
          setAvailableModels(data.freeModels);
        }
        if (data.primaryEngine) {
          setActiveProvider(data.primaryEngine);
        }
      })
      .catch(() => {});
  }, []);
  
  // Re-translate first message if it's the only one when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{...prev[0], text: currentT.welcome}];
      }
      return prev;
    });
  }, [lang, currentT.welcome]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || input;
    
    if (!textToSend.trim()) {
      setInputError(currentT.empty);
      return;
    }
    
    if (textToSend.trim().length > 500) {
      setInputError(currentT.tooLong);
      return;
    }

    setInputError(null);
    if (isLoading) return;

    resetActivityTimer();

    const currentTime = getTimeString();
    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: textToSend.trim(),
      timestamp: currentTime 
    };
    const initialAssistantMsgId = (Date.now() + 1).toString();
    const initialAssistantMsg: ChatMessage = { 
      id: initialAssistantMsgId, 
      role: 'assistant', 
      text: '', 
      isTyping: true,
      timestamp: currentTime 
    };
    
    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Send only last 4 messages to preserve tokens (pruning)
      const contextHistory = messages.slice(-4).map(m => ({ role: m.role, text: m.text }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg.text,
          history: contextHistory
        }),
      });

      // Capture headers showing which model handled the response
      const modelUsedHeader = response.headers.get('x-model-used');
      const providerHeader = response.headers.get('x-provider');
      if (modelUsedHeader) {
        try {
          const decoded = decodeURIComponent(modelUsedHeader);
          setActiveModel(decoded);
        } catch {}
      }
      if (providerHeader) {
        try {
          const decoded = decodeURIComponent(providerHeader);
          setActiveProvider(decoded);
        } catch {}
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error(currentT.loadingErr);
      }

      if (!response.ok) {
        let errText = currentT.fetchErr;
        try {
          const errData = await response.json();
          if (errData.text) errText = errData.text;
        } catch(e) {}
        throw new Error(errText);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      if (reader) {
        setIsLoading(false); // Stop loading indicator once first chunk arrives
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunkValue = decoder.decode(value, { stream: true });
            setMessages((prev) => 
               prev.map(msg => 
                 msg.id === initialAssistantMsgId 
                 ? { ...msg, text: msg.text + chunkValue } 
                 : msg
               )
            );
          }
        }
      }

      // Mark typing as done when stream finishes
      setMessages((prev) => 
         prev.map(msg => 
           msg.id === initialAssistantMsgId 
           ? { ...msg, isTyping: false } 
           : msg
         )
      );

    } catch (error: any) {
      const userFriendlyMessage = (typeof error?.message === 'string' && error.message.length < 200 && !error.message.includes('fetch') && !error.message.includes('Failed to execute') && !error.message.includes('object') && !error.message.includes('TypeError'))
        ? error.message 
        : currentT.defaultErr;
      setMessages((prev) => 
         prev.map(msg => 
           msg.id === initialAssistantMsgId 
           ? { ...msg, text: userFriendlyMessage, isTyping: false } 
           : msg
         )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuggestedQuestions = () => {
    const questions = currentT.questions;

    if (messages.length > 1) return null;

    return (
      <div className="flex flex-col gap-1.5 p-3">
        <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400/80 mb-0.5 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          {lang === 'pt' ? 'Sugestões de Conversa' : 'Conversation Starters'}
        </span>
        <div className={`grid ${isExpanded ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-1.5`}>
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(q);
                setTimeout(() => {
                  const formEvent = { preventDefault: () => {} } as React.FormEvent;
                  handleSend(formEvent, q);
                }, 50);
              }}
              className={`text-left text-xs border px-2.5 py-2 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                i === 0 
                  ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-200 hover:bg-cyan-900/60 hover:border-cyan-300 font-medium shadow-[0_0_12px_rgba(6,182,212,0.2)]' 
                  : 'bg-stone-900/90 border-stone-800 hover:border-cyan-400 text-stone-300 hover:text-cyan-300'
              }`}
            >
              <span>{q}</span>
              <span className={`text-[9px] font-mono ml-2 shrink-0 transition-colors ${i === 0 ? 'text-cyan-400' : 'text-cyan-400/60 group-hover:text-cyan-400'}`}>
                {i === 0 ? '★' : '⚡'}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => {
              setIsOpen(true);
              resetActivityTimer();
            }}
            className="fixed bottom-24 right-8 md:bottom-28 md:right-12 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl shadow-cyan-500/30 z-50 flex items-center justify-center group cursor-pointer"
            aria-label={currentT.openChat}
          >
            {/* Outer spinning orbital ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-400/50"
            />
            {/* Counter-rotating segmented ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-[-8px] rounded-full border border-cyan-500/20 border-t-cyan-400/80 border-b-cyan-400/80"
            />
            {/* Core Arc Glow */}
            <div className="absolute inset-0 rounded-full bg-stone-950/90 border-2 border-cyan-400/80 group-hover:border-cyan-300 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all flex items-center justify-center backdrop-blur-md">
              <Bot className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="absolute w-2 h-2 rounded-full bg-cyan-300 animate-ping opacity-75" />
            </div>
            {/* Attention-grabbing interactive badge */}
            <span className="absolute -top-3 -right-2 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 text-[9.5px] font-sans font-extrabold text-stone-950 px-2.5 py-0.5 rounded-full tracking-tight shadow-[0_0_16px_rgba(34,211,238,0.85)] flex items-center gap-1.5 border border-cyan-100 whitespace-nowrap select-none hover:scale-105 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {lang === 'pt' ? 'Fale com o Ygor.AI' : 'Talk with Ygor.AI'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`fixed bottom-20 right-4 md:bottom-28 md:right-12 ${
              isExpanded 
                ? 'w-[calc(100vw-32px)] sm:w-[620px] md:w-[740px] lg:w-[840px] h-[720px] max-h-[88vh]' 
                : 'w-[calc(100vw-32px)] sm:w-[460px] md:w-[490px] h-[590px] max-h-[82vh]'
            } bg-stone-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] z-50 flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300 ease-out`}
          >
            {/* Holographic Header */}
            <div className="bg-stone-950/90 px-4 py-3 border-b border-cyan-500/20 flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-950 via-stone-900 to-cyan-800 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                    <Bot className="w-4.5 h-4.5 text-cyan-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-stone-950 shadow-[0_0_6px_#34d399]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-mono text-xs font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                      YGOR.AI
                    </h3>
                    <button
                      onClick={() => setShowModelsInfo(!showModelsInfo)}
                      className="flex items-center gap-1 bg-cyan-950/70 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 hover:text-white hover:border-cyan-400 px-1.5 py-0.5 rounded transition-all cursor-pointer"
                      title={currentT.autoFailover}
                    >
                      <Zap className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{activeModel.length > 16 ? activeModel.slice(0, 15) + '…' : activeModel}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-stone-400 block">
                      {lang === 'pt' ? 'Consulta Executiva' : 'Executive Query'}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1 rounded flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      {currentT.ecoTokens}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowModelsInfo(!showModelsInfo)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${showModelsInfo ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-stone-800 text-stone-400 hover:text-cyan-400'}`}
                  title="Ver rede de modelos e redundância"
                  aria-label="Informações de modelos"
                >
                  <Cpu className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${isExpanded ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/40'}`}
                  title={isExpanded ? currentT.minimizeChat : currentT.expandChat}
                  aria-label={isExpanded ? currentT.minimizeChat : currentT.expandChat}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
                  aria-label={currentT.closeChat}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Redundancy & Model Cascade Info Overlay */}
            <AnimatePresence>
              {showModelsInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-stone-900/98 border-b border-cyan-500/30 p-3.5 text-xs text-stone-300 font-sans overflow-hidden z-20 backdrop-blur-md shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      {currentT.modelDrawerTitle}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Roteamento Ativo
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed mb-2.5">
                    {currentT.modelDrawerDesc}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto no-scrollbar pr-0.5">
                    {availableModels.map((m, idx) => (
                      <div 
                        key={m.id || idx}
                        className={`p-2 rounded-lg border text-[10px] font-mono flex flex-col justify-between transition-all ${
                          activeModel.toLowerCase().includes(m.name.toLowerCase().slice(0, 4))
                            ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                            : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold truncate">{m.name}</span>
                          <span className="text-[8px] text-stone-500">{m.provider}</span>
                        </div>
                        <span className="text-[8px] text-cyan-400/90 mt-1 font-sans">{m.tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                    <span className="flex items-center gap-1.5 text-cyan-300/90 font-mono text-[9px]">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      + Redes neurais em cluster com failover contínuo
                    </span>
                    <button
                      onClick={() => setShowModelsInfo(false)}
                      className="text-stone-400 hover:text-cyan-300 underline text-[10px] font-mono cursor-pointer"
                    >
                      {lang === 'pt' ? 'Fechar' : 'Close'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Area with WhatsApp Wallpaper Backdrop */}
            <div 
              ref={scrollContainerRef} 
              className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 font-sans no-scrollbar bg-stone-950/95 bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] [background-size:18px_18px]"
            >
              {messages
                .filter((msg) => msg.role === 'user' || (msg.text && msg.text.trim().length > 0))
                .map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={`flex items-end gap-2 sm:gap-2.5 ${msg.role === 'user' ? 'justify-end ml-auto' : 'justify-start mr-auto'} max-w-full`}
                  >
                    {/* Bot Avatar on Left (for Assistant) */}
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-950 via-stone-900 to-cyan-900 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0 self-end mb-1 relative">
                        <Bot className="w-4 h-4 text-cyan-300" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-stone-950" />
                      </div>
                    )}

                    {/* WhatsApp-Style Balloon */}
                    <div
                      className={`relative max-w-[85%] sm:max-w-[78%] p-3 sm:p-3.5 text-[13px] leading-relaxed shadow-lg ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-cyan-600 via-cyan-500 to-cyan-400 text-stone-950 font-medium rounded-2xl rounded-br-xs shadow-cyan-500/15'
                          : 'bg-stone-900/95 text-stone-100 border border-stone-700/60 rounded-2xl rounded-bl-xs shadow-stone-950/50'
                      }`}
                    >
                      {/* Assistant Top Badge */}
                      {msg.role === 'assistant' && (
                        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-stone-800/60 text-[10.5px]">
                          <span className="font-mono font-bold text-cyan-300 flex items-center gap-1">
                            <Bot className="w-3 h-3 text-cyan-400" />
                            Ygor.AI
                          </span>
                          <span className="text-[8.5px] font-mono text-stone-400 bg-stone-950/70 border border-stone-800/80 px-1.5 py-0.2 rounded">
                            {activeModel.length > 18 ? activeModel.slice(0, 16) + '…' : activeModel}
                          </span>
                        </div>
                      )}

                      {/* Content */}
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      ) : (
                        <div className="prose prose-invert prose-xs prose-p:my-0.5 prose-ul:my-1 prose-ul:pl-3.5 prose-li:my-0.5 prose-li:leading-snug prose-strong:text-cyan-300 marker:text-cyan-400 max-w-none break-words">
                          <Markdown>{msg.text}</Markdown>
                          {msg.isTyping && <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse align-middle" />}
                        </div>
                      )}

                      {/* Balloon Footer (Timestamp & Meta) */}
                      {msg.role === 'user' ? (
                        <div className="flex items-center justify-end gap-1 text-[9.5px] text-stone-950/80 font-mono mt-1 pt-0.5">
                          <span>{msg.timestamp || 'Agora'}</span>
                          <CheckCheck className="w-3.5 h-3.5 text-stone-950/80" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[9.5px] text-stone-400 font-mono mt-1.5 pt-1 border-t border-stone-800/40">
                          <button
                            onClick={() => handleCopyMessage(msg.text, msg.id)}
                            className="opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 text-[9px] text-stone-400 hover:text-cyan-300 cursor-pointer"
                            title="Copiar resposta"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                <span className="text-emerald-400 font-sans">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span className="font-sans">Copiar</span>
                              </>
                            )}
                          </button>
                          <span>{msg.timestamp || 'Agora'}</span>
                        </div>
                      )}
                    </div>

                    {/* Generic User Avatar on Right (for User) */}
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-800 border border-stone-600/70 flex items-center justify-center text-stone-300 shadow-sm shrink-0 self-end mb-1">
                        <User className="w-4 h-4 text-stone-300" />
                      </div>
                    )}
                  </motion.div>
                ))}

              {/* Typing Indicator with Robot Avatar */}
              {isLoading && (
                <div className="flex items-end gap-2 sm:gap-2.5 justify-start w-full">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-950 via-stone-900 to-cyan-900 border border-cyan-500/50 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0 self-end mb-1 relative">
                    <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-stone-950 animate-ping" />
                  </div>
                  <div className="bg-stone-900/95 border border-stone-700/60 rounded-2xl rounded-bl-xs px-3.5 py-2 flex items-center gap-2.5 shadow-lg">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    </div>
                    <span className="text-[11.5px] font-sans font-medium text-cyan-300">
                      {currentT.statusProcessing}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* System Status Badge */}
            <div className="px-3.5 py-1.5 border-t border-stone-800/60 bg-stone-950/70 text-[9px] uppercase font-mono tracking-wider flex justify-between items-center text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-cyan-300 font-bold">{activeModel}</span>
              </span>
              <span className="text-cyan-400/90 flex items-center gap-1 font-sans font-medium">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>{lang === 'pt' ? 'Interativo & Resumido' : 'Interactive & Concise'}</span>
              </span>
            </div>

            {renderSuggestedQuestions()}

            {/* Inactivity Warning Action */}
            {sessionStatus === 'inactivity_warning' && (
              <div className="px-3.5 py-2 bg-amber-950/80 border-t border-amber-500/30 flex items-center justify-between gap-2 text-[11px] text-amber-200">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                  <span>{currentT.sessionWarningBadge}</span>
                </div>
                <button
                  onClick={() => {
                    resetActivityTimer();
                    handleSend(undefined, lang === 'pt' ? 'Estou por aqui! Gostaria de continuar a conversa.' : "I'm still here! I'd like to continue the conversation.");
                  }}
                  className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 hover:text-white px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors cursor-pointer"
                >
                  {currentT.continueSession}
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 flex flex-col gap-1.5">
              <AnimatePresence>
                {inputError && (
                  <motion.span 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs text-red-400 px-1"
                  >
                    {inputError}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {sessionStatus === 'closed' ? (
                <div className="p-2.5 bg-stone-900/90 border border-stone-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-sans">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{currentT.sessionClosedBadge}</span>
                  </div>
                  <button
                    onClick={handleRestartChat}
                    className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {currentT.restartSession}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      resetActivityTimer();
                      if (inputError) setInputError(null);
                    }}
                    placeholder={currentT.inputPlaceholder}
                    className="flex-1 bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-stone-500 font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                    title="Enviar mensagem"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
