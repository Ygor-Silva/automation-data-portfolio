'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import Markdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isTyping?: boolean;
}

export default function FloatingChat({ lang = 'pt' }: { lang?: 'pt' | 'en' }) {
  const t = {
    pt: {
      welcome: 'Olá! Sou o assistente virtual do portfólio. Como posso ajudar você a conhecer mais sobre a experiência profissional e os projetos descritos aqui?',
      empty: 'A mensagem não pode estar vazia.',
      tooLong: 'A mensagem é muito longa. Por favor, resuma em poucas palavras.',
      loadingErr: 'O servidor está iniciando ou reconectando. Por favor, aguarde alguns segundos e tente novamente.',
      fetchErr: 'Erro ao buscar a resposta. Tente novamente mais tarde.',
      defaultErr: 'Desculpe, ocorreu um erro.',
      questions: [
        "Qual sua maior experiência com RPA?",
        "Como você utiliza dados para tomada de decisão?",
        "Quais tecnologias você mais utiliza?",
        "Como entrar em contato para consultoria?"
      ],
      inputPlaceholder: "Pergunte sobre meus projetos...",
      askAssistant: "Assistente IA",
      closeChat: "Fechar chat",
      openChat: "Abrir chat",
      statusProcessing: "Processando... (~3s)",
      statusOnline: "Online"
    },
    en: {
      welcome: 'Hello! I am the portfolio virtual assistant. How can I help you learn more about the professional experience and projects described here?',
      empty: 'The message cannot be empty.',
      tooLong: 'The message is too long. Please summarize in a few words.',
      loadingErr: 'The server is starting or reconnecting. Please wait a few seconds and try again.',
      fetchErr: 'Error fetching the response. Please try again later.',
      defaultErr: 'Sorry, an error occurred.',
      questions: [
        "What is your biggest experience with RPA?",
        "How do you use data for decision making?",
        "What technologies do you use the most?",
        "How to contact for consulting?"
      ],
      inputPlaceholder: "Ask about my projects...",
      askAssistant: "AI Assistant",
      closeChat: "Close chat",
      openChat: "Open chat",
      statusProcessing: "Processing... (~3s)",
      statusOnline: "Online"
    }
  };

  const currentT = t[lang];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'assistant',
    text: currentT.welcome,
    isTyping: false
  }]);
  
  // Re-translate first message if it's the only one when languge changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{...prev[0], text: currentT.welcome}];
      }
      return prev;
    });
  }, [lang, currentT.welcome]);

  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    
    if (textToSend.trim().length > 200) {
      setInputError(currentT.tooLong);
      return;
    }

    setInputError(null);
    if (isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend.trim() };
    const initialAssistantMsgId = (Date.now() + 1).toString();
    const initialAssistantMsg: ChatMessage = { id: initialAssistantMsgId, role: 'assistant', text: '', isTyping: true };
    
    setMessages((prev) => [...prev, userMsg, initialAssistantMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg.text,
          history: messages.slice(-6) // just sending last few messages to give context 
        }),
      });

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
        setIsLoading(false); // Can stop loading spinner when streaming starts
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
      console.error(error);
      setMessages((prev) => 
         prev.map(msg => 
           msg.id === initialAssistantMsgId 
           ? { ...msg, text: error.message || currentT.defaultErr, isTyping: false } 
           : msg
         )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isContactSectionVisible = () => {
    // We can also let the floating icon just be there on the page fixed!
    // The requirement says "na seção de Contato", so let's let the button be floating on the bottom right.
    return true;
  };

  const renderSuggestedQuestions = () => {
    const questions = currentT.questions;

    if (messages.length > 1) return null;

    return (
      <div className="flex flex-col gap-2 p-4">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(q);
              // Small delay to allow state update before sending
              setTimeout(() => {
                const formEvent = { preventDefault: () => {} } as React.FormEvent;
                handleSend(formEvent, q);
              }, 50);
            }}
            className="text-left text-xs bg-stone-900 border border-stone-700 hover:border-cyan-400 text-stone-300 hover:text-cyan-400 p-2 rounded-lg transition-colors"
          >
            {q}
          </button>
        ))}
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
            onClick={() => setIsOpen(true)}
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
              {/* Pulsing core light */}
              <span className="absolute w-2 h-2 rounded-full bg-cyan-300 animate-ping opacity-75" />
            </div>
            {/* Subtle JARVIS tag badge */}
            <span className="absolute -top-2 -right-1 bg-cyan-500 text-[9px] font-mono font-black text-black px-1.5 py-0.5 rounded tracking-tighter uppercase shadow">
              AI
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
            className="fixed bottom-24 right-6 md:bottom-28 md:right-12 w-[calc(100vw-48px)] md:w-[400px] h-[520px] max-h-[75vh] bg-stone-950/95 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Holographic Header */}
            <div className="bg-stone-950/90 px-4 py-3 border-b border-cyan-500/20 flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]" />
                  <div className="w-5 h-5 border border-cyan-400/40 rounded-full absolute animate-ping" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-mono text-xs font-black uppercase tracking-[0.2em]">
                      YGOR.AI
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 block">
                    {lang === 'pt' ? 'Sistema de Consulta Executiva' : 'Executive Query System'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label={currentT.closeChat}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-sans no-scrollbar bg-gradient-to-br from-stone-900 to-stone-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-stone-950'
                        : 'bg-stone-800/80 backdrop-blur-sm text-stone-200 border border-stone-700/50 shadow-inner'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="prose prose-invert prose-sm prose-p:my-1 prose-ul:my-1.5 prose-ul:pl-4 prose-li:my-0.5 prose-li:leading-tight prose-strong:text-cyan-400 marker:text-cyan-500 max-w-none break-words">
                         <Markdown>{msg.text}</Markdown>
                         {msg.isTyping && <span className="inline-block w-1 h-3 ml-1 bg-cyan-400 animate-pulse align-middle" />}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-800 border border-stone-700 rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* System Status Badge */}
            <div className="px-4 py-2 border-t border-stone-800/50 bg-stone-900/50 text-[10px] uppercase font-mono tracking-wider flex justify-between items-center">
              <span className="text-stone-500">Status</span>
              {isLoading ? (
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                  {currentT.statusProcessing}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-stone-500">
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full" />
                  {currentT.statusOnline}
                </span>
              )}
            </div>

            {renderSuggestedQuestions()}

            {/* Input Area */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col gap-2">
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
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (inputError) setInputError(null);
                  }}
                  placeholder={currentT.inputPlaceholder}
                  className="flex-1 bg-stone-900 border border-stone-700 text-stone-200 text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
