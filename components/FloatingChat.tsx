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

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'welcome',
    role: 'assistant',
    text: 'Olá! Sou o assistente virtual do portfólio. Como posso ajudar você a conhecer mais sobre a experiência profissional e os projetos descritos aqui?',
    isTyping: false
  }]);
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
      setInputError('A mensagem não pode estar vazia.');
      return;
    }
    
    if (textToSend.trim().length > 200) {
      setInputError('A mensagem é muito longa. Por favor, resuma em poucas palavras.');
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
        throw new Error("O servidor está iniciando ou reconectando. Por favor, aguarde alguns segundos e tente novamente.");
      }

      if (!response.ok) {
        let errText = "Erro ao buscar a resposta. Tente novamente mais tarde.";
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
           ? { ...msg, text: error.message || 'Desculpe, ocorreu um erro.', isTyping: false } 
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
    const questions = [
      "Qual sua maior experiência com RPA?",
      "Como você utiliza dados para tomada de decisão?",
      "Quais tecnologias você mais utiliza?",
      "Como entrar em contato para consultoria?"
    ];

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
            className="fixed bottom-24 right-8 md:bottom-28 md:right-12 p-3 md:p-4 bg-cyan-500 border border-cyan-400 text-stone-950 rounded-full shadow-xl shadow-cyan-500/20 z-50 transition-colors hover:bg-cyan-400 group"
            aria-label="Abrir chat"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 md:bottom-28 md:right-12 w-[calc(100vw-48px)] md:w-[380px] h-[500px] max-h-[70vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-stone-950 p-4 border-b border-stone-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <h3 className="text-stone-200 font-mono text-sm font-bold uppercase tracking-widest">
                  YgorBot
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white transition-colors"
                aria-label="Fechar chat"
              >
                <X className="w-5 h-5" />
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
                  Processando... (~3s)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-stone-500">
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full" />
                  Online
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
                  placeholder="Pergunte sobre meus projetos..."
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
