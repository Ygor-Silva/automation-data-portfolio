'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { 
  Activity, 
  Terminal, 
  Cpu, 
  Layers, 
  BarChart2, 
  Send, 
  Compass,
  Radio
} from 'lucide-react';

/* =========================================================================
   1. JARVIS TOP TELEMETRY RIBBON
   ========================================================================= */
interface JarvisTopTelemetryProps {
  lang: 'pt' | 'en';
  activeSector: string;
}

export function JarvisTopTelemetry({ lang, activeSector }: JarvisTopTelemetryProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState('');
  const { scrollYProgress } = useScroll();
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);

    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    const unsubscribeScroll = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clearInterval(timer);
      unsubscribeScroll();
    };
  }, [scrollYProgress]);

  return (
    <aside aria-label="JARVIS Telemetry Bar" className="hidden lg:flex fixed top-0 left-0 right-0 z-50 h-7 bg-black/80 border-b border-cyan-500/20 backdrop-blur-md px-6 items-center justify-between text-[10px] font-mono text-stone-400 select-none">
      {/* Left: System Status & Protocol */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span>JARVIS.SYS: ONLINE</span>
        </div>
        <span className="text-stone-700">|</span>
        <div className="flex items-center gap-1.5 text-stone-400">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>CORE: NOMINAL</span>
        </div>
        <span className="text-stone-700">|</span>
        <div className="text-stone-500">
          <span>SEC: {activeSector.toUpperCase()}</span>
        </div>
      </div>

      {/* Center: Live Reticle Coords & Scroll Buffer */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Compass className="w-3 h-3 text-cyan-500/70 animate-spin-slow" />
          <span className="text-cyan-400/90 font-semibold">
            LOC [X: {String(coords.x).padStart(4, '0')} | Y: {String(coords.y).padStart(4, '0')}]
          </span>
        </div>
        <span className="text-stone-700">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500">{lang === 'pt' ? 'BUFFER:' : 'BUFFER:'}</span>
          <span className="text-cyan-400 font-bold font-mono">{scrollPercent}%</span>
        </div>
      </div>

      {/* Right: Clock & Quantum status */}
      <div className="flex items-center gap-4 text-stone-400">
        <div className="flex items-center gap-1.5 text-emerald-400/90">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>60 FPS // LINK STABLE</span>
        </div>
        <span className="text-stone-700">|</span>
        <span className="text-stone-500">{timeStr}</span>
      </div>
    </aside>
  );
}

/* =========================================================================
   2. DATA SPINE - COMPACT 3D VERTICAL NAVIGATION (NON-INTRUSIVE)
   ========================================================================= */
interface DataSpineProps {
  lang: 'pt' | 'en';
  activeSection: string;
}

export function JarvisDataSpine({ lang, activeSection }: DataSpineProps) {
  const sectors = [
    { id: 'about', num: '01', labelPt: 'SOBRE', labelEn: 'ABOUT', icon: Cpu },
    { id: 'experience', num: '02', labelPt: 'CARREIRA', labelEn: 'CAREER', icon: Terminal },
    { id: 'projects', num: '03', labelPt: 'PROJETOS', labelEn: 'PROJECTS', icon: Layers },
    { id: 'project-statistics', num: '04', labelPt: 'MÉTRICAS', labelEn: 'METRICS', icon: BarChart2 },
    { id: 'skills', num: '05', labelPt: 'STACK', labelEn: 'STACK', icon: Activity },
    { id: 'contact', num: '06', labelPt: 'CONTATO', labelEn: 'CONTACT', icon: Send },
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Navegação lateral" 
      className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center pointer-events-auto"
    >
      {/* Laser Guide Wire - Slim line */}
      <div className="absolute top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent pointer-events-none">
        <motion.div 
          className="w-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
          style={{ height: '20%', top: '0%' }}
          animate={{
            y: ['0%', '400%', '0%'],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative flex flex-col gap-6 py-2">
        {sectors.map((sec) => {
          const isActive = activeSection === sec.id;
          const Icon = sec.icon;

          return (
            <button
              key={sec.id}
              onClick={() => handleScrollTo(sec.id)}
              className="group relative flex items-center justify-center cursor-pointer select-none focus:outline-none p-1"
              aria-label={`Ir para ${lang === 'pt' ? sec.labelPt : sec.labelEn}`}
            >
              {/* Connector Node - Compact micro-node (does not crowd text) */}
              <div 
                className={`relative w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300 backdrop-blur-md ${
                  isActive 
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)] scale-110' 
                    : 'bg-stone-950/80 border-stone-800/80 text-stone-500 hover:border-cyan-500/40 hover:text-cyan-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                
                {isActive && (
                  <span className="absolute -inset-0.5 rounded-lg border border-cyan-400/40 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Floating Tooltip - ONLY appears on hover so it NEVER sits over the text when scrolling */}
              <div 
                className="absolute left-full ml-3.5 px-3 py-1.5 rounded-lg bg-stone-950/95 border border-cyan-500/30 text-stone-200 text-xs font-mono shadow-2xl shadow-cyan-950/50 pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center gap-2"
              >
                <span className="text-cyan-400 font-bold text-[10px] tracking-wider">
                  0{sec.num} {'//'}
                </span>
                <span className="font-medium text-stone-200 uppercase tracking-wider text-[11px]">
                  {lang === 'pt' ? sec.labelPt : sec.labelEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* =========================================================================
   3. SCROLL-3D CARD WRAPPER WITH TILT & HOLOGRAPHIC RETICLE
   ========================================================================= */
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: 'cyan' | 'violet' | 'emerald';
}

export function Card3D({ children, className = '', id, glowColor = 'cyan' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7; // Max tilt 7 deg
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const glowBorder = {
    cyan: 'hover:border-cyan-400/50 shadow-cyan-500/10',
    violet: 'hover:border-violet-400/50 shadow-violet-500/10',
    emerald: 'hover:border-emerald-400/50 shadow-emerald-500/10',
  }[glowColor];

  return (
    <div 
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 relative group transition-all duration-300 ${className}`}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
        }}
        className={`preserve-3d relative w-full h-full rounded-2xl border border-stone-800/90 bg-stone-950/70 backdrop-blur-md transition-shadow duration-300 ${glowBorder}`}
      >
        {/* Holographic Glare Layer */}
        <div 
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(34, 211, 238, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Tactical HUD Corner Reticles */}
        <div className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors z-20" />
        <div className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors z-20" />
        <div className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors z-20" />
        <div className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors z-20" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================================
   4. ARC REACTOR / HOLOGRAPHIC ROTATING HUD (Hero Portrait Frame)
   ========================================================================= */
export function ArcReactorFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Outer 3D Perspective Spinning Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
      />

      {/* Counter-rotating Target Ring with Tick Marks */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="absolute w-80 h-80 md:w-[410px] md:h-[410px] rounded-full border border-cyan-500/20 pointer-events-none flex items-center justify-between px-1"
      >
        <span className="text-[8px] font-mono text-cyan-400/70">00°</span>
        <span className="text-[8px] font-mono text-cyan-400/70">90°</span>
        <span className="text-[8px] font-mono text-cyan-400/70">180°</span>
        <span className="text-[8px] font-mono text-cyan-400/70">270°</span>
      </motion.div>

      {/* Segmented Arc Reactor Glow */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute w-64 h-64 md:w-88 md:h-88 rounded-full border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] pointer-events-none"
      />

      {/* Target Reticle Crosshairs */}
      <div className="absolute top-1/2 -left-4 -right-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 -top-4 -bottom-4 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent pointer-events-none" />

      {/* Inner Avatar/Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/* =========================================================================
   5. PERSPECTIVE 3D CYBER GRID (Ambient Background Depth)
   ========================================================================= */
export function PerspectiveCyberGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 3D Wireframe Horizon at Bottom */}
      <div 
        className="absolute -bottom-32 left-[-20%] right-[-20%] h-[450px] opacity-[0.14]"
        style={{
          perspective: '600px',
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            transform: 'rotateX(72deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%, black 90%, transparent)',
          }}
        />
      </div>

      {/* Ambient Arc Reactor Blue Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
