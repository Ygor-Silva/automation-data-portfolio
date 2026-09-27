'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  X, 
  ExternalLink, 
  Github, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export interface ProjectItem {
  category: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  githubIcon?: any;
  image?: string;
  images?: string[];
}

interface ProjectFocusModalProps {
  project: ProjectItem | null;
  allProjects: ProjectItem[];
  lang: 'pt' | 'en';
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectFocusModal({
  project,
  allProjects,
  lang,
  onClose,
  onSelectProject,
}: ProjectFocusModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevTitle, setPrevTitle] = useState(project?.title);

  // Adjust state during render when project changes (recommended React pattern)
  if (project && project.title !== prevTitle) {
    setPrevTitle(project.title);
    setCurrentSlideIndex(0);
  }

  // Lock body scroll and listen for keyboard navigation
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allProjects.findIndex(p => p.title === project.title);
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % allProjects.length;
          onSelectProject(allProjects[nextIndex]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allProjects.findIndex(p => p.title === project.title);
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
          onSelectProject(allProjects[prevIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.title === project.title);
  const totalProjects = allProjects.length;
  const projectImages = project.images || (project.image ? [project.image] : []);
  const activeImage = projectImages[currentSlideIndex] || project.image || '';

  const handlePrevProject = () => {
    const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    onSelectProject(allProjects[prevIndex]);
  };

  const handleNextProject = () => {
    const nextIndex = (currentIndex + 1) % totalProjects;
    onSelectProject(allProjects[nextIndex]);
  };

  const GithubIcon = project.githubIcon || Github;

  return (
    <AnimatePresence>
      <motion.div
        key="focus-mode-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between"
      >
        {/* TOP BAR: HUD FOCUS STATUS & CONTROLS */}
        <header className="sticky top-0 z-20 w-full px-4 md:px-8 py-3.5 bg-stone-950/90 border-b border-cyan-500/20 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
              <span className="font-bold tracking-wider uppercase">
                {lang === 'pt' ? 'Modo Foco Ativado' : 'Focus Mode Active'}
              </span>
            </div>
            <span className="hidden sm:inline-block text-stone-500 text-xs font-mono">
              [{currentIndex + 1} / {totalProjects}]
            </span>
          </div>

          {/* Quick Prev / Next Navigator in Header */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 mr-4 text-xs font-mono text-stone-400">
              <button 
                onClick={handlePrevProject}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Projeto anterior (←)"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{lang === 'pt' ? 'Anterior' : 'Prev'}</span>
              </button>
              <button 
                onClick={handleNextProject}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Próximo projeto (→)"
              >
                <span>{lang === 'pt' ? 'Próximo' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Exit Focus Mode button */}
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400 hover:text-stone-950 transition-all font-mono text-xs font-bold tracking-wider cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              aria-label="Sair do modo foco"
            >
              <Minimize2 className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Sair do Modo Foco' : 'Exit Focus'}</span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-cyan-500/30 font-mono">
                ESC
              </span>
            </button>
          </div>
        </header>

        {/* CENTER STAGE: THE SPOTLIGHTED PROJECT */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-stone-900/90 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-950/60 backdrop-blur-xl relative"
          >
            {/* Tech Corner Reticles */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />

            {/* High-Resolution Project Showcase Display */}
            {activeImage && (
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-black/80 border-b border-stone-800 overflow-hidden group">
                <Image
                  src={activeImage}
                  alt={project.title}
                  fill
                  priority
                  quality={100}
                  className="object-contain md:object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30 pointer-events-none" />

                {/* Multiple Images Carousel Controls */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-400 hover:text-stone-950 transition-all cursor-pointer shadow-lg"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % projectImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-950/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-400 hover:text-stone-950 transition-all cursor-pointer shadow-lg"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slide Counter & Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-stone-950/80 border border-stone-800 px-3 py-1 rounded-full backdrop-blur-md">
                      {projectImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === currentSlideIndex ? 'w-5 bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'w-1.5 bg-stone-600 hover:bg-stone-400'
                          }`}
                          aria-label={`Ir para imagem ${idx + 1}`}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-stone-400 ml-1">
                        {currentSlideIndex + 1}/{projectImages.length}
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Thumbnail Strip (if multiple screenshots) */}
            {projectImages.length > 1 && (
              <div className="flex gap-2 p-3 bg-stone-950/60 border-b border-stone-800/80 overflow-x-auto no-scrollbar">
                {projectImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`relative w-20 h-12 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      idx === currentSlideIndex ? 'border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)] scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Detailed Metadata & Technical Breakdown */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-stone-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {lang === 'pt' ? 'Produção / Homologado' : 'Production / Approved'}
                  </span>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-200 hover:text-white transition-all text-xs font-mono border border-stone-700"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>{lang === 'pt' ? 'Repositório' : 'Repository'}</span>
                    </a>
                  )}

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-stone-950 font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all text-xs font-mono uppercase tracking-wider"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{lang === 'pt' ? 'Acessar Projeto' : 'Live Preview'}</span>
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white font-mono tracking-tight mb-3">
                  {project.title}
                </h1>
                <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* Solution & Impact Box */}
              <div className="p-4 md:p-5 rounded-2xl bg-stone-950/80 border border-cyan-500/20 flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs md:text-sm font-mono text-stone-400 leading-relaxed">
                  <p className="text-stone-200 font-semibold uppercase tracking-wider">
                    {lang === 'pt' ? 'FOCO OPERACIONAL & ENGENHARIA:' : 'OPERATIONAL FOCUS & ENGINEERING:'}
                  </p>
                  <p>
                    {lang === 'pt'
                      ? 'Desenvolvido para eliminar gargalos manuais, automatizar o fluxo de dados em ponta a ponta e garantir conformidade analítica com tomada de decisão rápida e precisa.'
                      : 'Built to eliminate manual bottlenecks, automate end-to-end data flows, and ensure analytical compliance with fast, accurate decision making.'}
                  </p>
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
                  {lang === 'pt' ? 'TECNOLOGIAS & FERRAMENTAS:' : 'TECHNOLOGIES & TOOLS:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-stone-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium tracking-wide shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        {/* BOTTOM HUD FOOTER: KEYBOARD GUIDE & NAVIGATION */}
        <footer className="sticky bottom-0 z-20 w-full px-4 md:px-8 py-3 bg-stone-950/90 border-t border-stone-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevProject}
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Projeto Anterior' : 'Previous Project'}</span>
            </button>
            <span className="text-stone-700">|</span>
            <button
              onClick={handleNextProject}
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>{lang === 'pt' ? 'Próximo Projeto' : 'Next Project'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-400">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 mr-1">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 mr-1.5">→</kbd>
              {lang === 'pt' ? 'navegar' : 'navigate'}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300 mr-1.5">ESC</kbd>
              {lang === 'pt' ? 'fechar foco' : 'exit focus'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Voltar para visão completa' : 'Back to full view'}
          </button>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
