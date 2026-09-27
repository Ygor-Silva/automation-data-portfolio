'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Building2 } from 'lucide-react';

interface CompanyBrand {
  name: string;
  logo: string;
  width: number;
  height: number;
  imgClass?: string;
}

const companies: CompanyBrand[] = [
  {
    name: 'Tecnolimp',
    logo: '/tecnolimp_brand.svg',
    width: 250,
    height: 52,
    imgClass: 'h-10 md:h-12 w-auto max-w-[90%] object-contain'
  },
  {
    name: 'Livrarias Curitiba',
    logo: '/livrarias_curitiba_brand.png',
    width: 240,
    height: 52,
    imgClass: 'h-10 md:h-12 w-auto max-w-[90%] object-contain'
  },
  {
    name: 'Hepta Tecnologia',
    logo: '/hepta_logo.svg',
    width: 170,
    height: 52,
    imgClass: 'h-9 md:h-11 w-auto max-w-[85%] object-contain'
  },
  {
    name: 'Cadmus',
    logo: '/cadmus_logo_azul.png',
    width: 200,
    height: 50,
    imgClass: 'h-8 md:h-10 w-auto max-w-[85%] object-contain'
  },
  {
    name: 'Mercedes-Benz',
    logo: '/mercedes_benz_brand.png',
    width: 220,
    height: 58,
    imgClass: 'h-10 md:h-12 w-auto max-w-[90%] object-contain'
  }
];

export function CompanyMarquee({ lang = 'pt' }: { lang?: 'pt' | 'en' }) {
  // Duplicate array 4 times for a completely seamless infinite continuous track
  const marqueeItems = [...companies, ...companies, ...companies, ...companies];

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden border-t border-stone-800/40 bg-stone-950/60">
      {/* Glow gradient backdrops */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-mono">
            {lang === 'pt' ? 'Empresas & Trajetória' : 'Companies & Career History'}
          </h2>
        </div>
        <p className="text-stone-400 text-xs md:text-sm max-w-2xl mx-auto font-mono uppercase tracking-wider">
          {lang === 'pt' 
            ? 'Grandes organizações onde atuei construindo soluções de alto impacto' 
            : 'Top organizations where I built high-impact systems & solutions'}
        </p>
      </div>

      {/* Infinite Marquee Wrapper with Edge Fade Mask */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex gap-6 w-max py-4 cursor-pointer"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 28,
              ease: 'linear',
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {marqueeItems.map((item, idx) => (
            <a
              key={`${item.name}-${idx}`}
              href="#experience"
              title={item.name}
              className="group relative flex items-center justify-center bg-stone-900/70 hover:bg-stone-900 border border-stone-800/80 hover:border-cyan-500/40 px-3.5 py-3 md:px-4 md:py-3.5 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:-translate-y-1 shrink-0 w-56 md:w-64 h-24 md:h-28"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 pointer-events-none" />

              {/* Clean pristine logo canvas */}
              <div className="w-full h-full rounded-xl bg-white/95 group-hover:bg-white border border-stone-200/20 px-3.5 py-2 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  className={`${item.imgClass || 'max-h-full max-w-full object-contain'} filter group-hover:brightness-105 transition-all duration-300`}
                  referrerPolicy="no-referrer"
                />
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
