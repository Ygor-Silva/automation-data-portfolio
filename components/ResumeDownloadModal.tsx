'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  FileText, 
  CheckCircle2, 
  Building, 
  User, 
  Mail, 
  Linkedin,
  ExternalLink,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { resumeData } from '../lib/resumeData';
import { generateResumePdf } from '../lib/generateResumePdf';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'pt' | 'en';
}

export default function ResumeDownloadModal({
  isOpen,
  onClose,
  lang = 'pt',
}: ResumeDownloadModalProps) {
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // 1. Register download event silently for telemetry/logging
      fetch('/api/notify-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recruiterName: recruiterName.trim() || 'Recrutador / Visitante',
          recruiterCompany: recruiterCompany.trim() || 'Empresa não informada',
          lang,
        }),
      }).catch((err) => console.error('Silent alert log:', err));

      // 2. Generate and trigger direct download
      const blob = generateResumePdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Curriculo_Ygor_Teixeira_Analista_BI_ITSM.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setHasDownloaded(true);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-stone-900/95 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* HUD Tech Corner Marks */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Top Header */}
          <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-wide">
                  {lang === 'pt' ? 'Centro de Download • Currículo Oficial' : 'Download Center • Official Resume'}
                </h2>
                <p className="text-xs text-stone-400 font-mono">
                  {lang === 'pt' ? 'Formato PDF • Atualizado 2026' : 'PDF Format • Updated 2026'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Split Layout (Left Preview / Right Actions) */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Document Abstract Preview (7 cols) */}
            <div className="lg:col-span-7 bg-stone-950/80 rounded-2xl border border-stone-800/80 p-5 font-sans space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-black text-white font-mono tracking-tight">
                    {resumeData.name}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                  {resumeData.title}
                </p>
                <p className="text-[11px] text-stone-400 font-mono mt-1">
                  {resumeData.email} • {resumeData.location}
                </p>
              </div>

              {/* Perfil */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  {lang === 'pt' ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {resumeData.profile}
                </p>
              </div>

              {/* Destaques */}
              <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {lang === 'pt' ? 'MÉTRICAS & RESULTADOS EM DESTAQUE' : 'HIGHLIGHTED METRICS & RESULTS'}
                </span>
                <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                  {resumeData.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Experiências Recentes */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  {lang === 'pt' ? 'TRAJETÓRIA CORPORATIVA' : 'CAREER HISTORY'}
                </span>
                <div className="space-y-2.5">
                  {resumeData.experiences.slice(0, 3).map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-cyan-500/40 pl-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white font-mono">{exp.role}</span>
                        <span className="text-[10px] text-stone-500 font-mono">{exp.period}</span>
                      </div>
                      <p className="text-xs text-stone-400 font-medium">{exp.company}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competências Chave */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  {lang === 'pt' ? 'PRINCIPAIS FERRAMENTAS' : 'CORE SKILLS'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Power BI (DAX)',
                    'PL/SQL (Oracle)',
                    'Python (Pandas)',
                    'ITSM / ITIL',
                    'ERP Senior Sapiens',
                    'Looker Studio',
                    'Jira API (JQL)',
                  ].map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Download Form & Instant Notification (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="bg-stone-950/70 p-4 rounded-2xl border border-cyan-500/20">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    {lang === 'pt' ? 'Identificação Rápida' : 'Quick Recruiter Info'}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    {lang === 'pt'
                      ? 'Opcional. Permite que o Ygor saiba quem acessou o currículo para priorizar contato.'
                      : 'Optional. Lets Ygor know who reviewed the resume for prioritized reachout.'}
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="block text-stone-400 text-[11px] mb-1">
                        {lang === 'pt' ? 'Seu Nome / Recrutador:' : 'Your Name / Recruiter:'}
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={recruiterName}
                          onChange={(e) => setRecruiterName(e.target.value)}
                          placeholder="Ex: Amanda Silva (Tech Recruiter)"
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-400 text-[11px] mb-1">
                        {lang === 'pt' ? 'Empresa / Organização:' : 'Company / Organization:'}
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={recruiterCompany}
                          onChange={(e) => setRecruiterCompany(e.target.value)}
                          placeholder="Ex: Empresa X / Consultoria"
                          className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Download Trigger */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-stone-950 font-bold font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>
                    {isDownloading
                      ? (lang === 'pt' ? 'Gerando Documento...' : 'Generating Document...')
                      : (lang === 'pt' ? 'Baixar Currículo PDF Oficial' : 'Download Official PDF Resume')}
                  </span>
                </button>

                {/* Post-Download Confirmation State */}
                {hasDownloaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-start gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">
                        {lang === 'pt' ? 'Download concluído com sucesso!' : 'Download started successfully!'}
                      </span>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        {lang === 'pt'
                          ? 'O arquivo PDF foi gerado e salvo no seu dispositivo.'
                          : 'The official PDF has been saved to your device.'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Direct Professional Contact Channels (No personal phone exposed) */}
              <div className="pt-2 border-t border-stone-800 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  {lang === 'pt' ? 'CONTATO PROFISSIONAL' : 'PROFESSIONAL CONTACT'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={resumeData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-cyan-500/40 text-stone-300 hover:text-white transition-all font-mono text-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                  </a>

                  <a
                    href={`mailto:${resumeData.email}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-cyan-500/40 text-stone-300 hover:text-white transition-all font-mono text-xs"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>E-mail</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
