'use client';

import React from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue
} from 'motion/react';
import { Boxes } from 'lucide-react';

type Lang = 'pt' | 'en';

interface Slide {
  image: string;
  kicker: string;
  title: string;
  text: string;
  metric: [string, string];
  chips: string[];
  status: string;
  live: boolean;
}

const getSlides = (lang: Lang): Slide[] => [
  {
    image: '/projects/portal-relatorios/tela-2.jpg',
    kicker: lang === 'pt' ? '01 · Sistema corporativo' : '01 · Corporate system',
    title: lang === 'pt' ? 'Portal de Relatórios' : 'Reporting Portal',
    text: lang === 'pt'
      ? 'Oracle → Python → Supabase. Cada área vê só o que pode, com a permissão aplicada no banco.'
      : 'Oracle → Python → Supabase. Each area sees only what it may, enforced in the database.',
    metric: ['49', lang === 'pt' ? 'migrations versionadas' : 'versioned migrations'],
    chips: ['RLS', 'Python', 'E2E'],
    status: lang === 'pt' ? 'Em produção' : 'In production',
    live: true
  },
  {
    image: '/projects/ferias-coberturas/tela-2.jpg',
    kicker: lang === 'pt' ? '02 · RH & regras de negócio' : '02 · HR & business rules',
    title: lang === 'pt' ? 'Férias & Coberturas' : 'Vacation & Coverage',
    text: lang === 'pt'
      ? 'Cobertura sugerida por proximidade e trava de demissão integrada ao ERP via web service.'
      : 'Proximity-based coverage and a dismissal lock integrated with the ERP via web service.',
    metric: ['3', lang === 'pt' ? 'empresas atendidas' : 'companies served'],
    chips: ['SOAP', lang === 'pt' ? 'Geocodificação' : 'Geocoding', 'LGPD'],
    status: lang === 'pt' ? 'Em desenvolvimento' : 'In development',
    live: false
  },
  {
    image: '/projects/rodaz/tela-2.jpg',
    kicker: lang === 'pt' ? '03 · SaaS multi-tenant' : '03 · Multi-tenant SaaS',
    title: 'Rodaz',
    text: lang === 'pt'
      ? 'Frotas white-label com isolamento por cliente, RBAC e CI/CD do commit ao deploy.'
      : 'White-label fleets with per-tenant isolation, RBAC and CI/CD from commit to deploy.',
    metric: ['109', lang === 'pt' ? 'testes automatizados' : 'automated tests'],
    chips: ['Next.js 16', 'PostgreSQL', 'Docker'],
    status: lang === 'pt' ? 'Em homologação' : 'In staging (UAT)',
    live: false
  }
];

// Interpolação linear por trechos (em JS, para não cair na animação acelerada por ScrollTimeline,
// que dessincroniza a opacidade com várias faixas).
const piecewise = (input: number[], output: number[]) => (v: number) => {
  if (v <= input[0]) return output[0];
  for (let k = 1; k < input.length; k++) {
    if (v <= input[k]) {
      const t = (v - input[k - 1]) / (input[k] - input[k - 1] || 1);
      return output[k - 1] + (output[k] - output[k - 1]) * t;
    }
  }
  return output[output.length - 1];
};

// Janela de visibilidade de cada tela ao longo do scroll (a primeira já começa visível, a última fica).
const windowFor = (i: number, n: number) => {
  const a = i / n, b = (i + 1) / n, f = 0.06;
  if (i === 0) return { input: [0, b - f, b + f], output: [1, 1, 0] };
  if (i === n - 1) return { input: [a - f, a + f, 1], output: [0, 1, 1] };
  return { input: [a - f, a + f, b - f, b + f], output: [0, 1, 1, 0] };
};

function Screen({ slide, i, n, progress }: { slide: Slide; i: number; n: number; progress: MotionValue<number> }) {
  const w = windowFor(i, n);
  const opacity = useTransform(progress, piecewise(w.input, w.output));
  const y = useTransform(progress, w.input, i === 0 ? [0, 0, -40] : i === n - 1 ? [60, 0, 0] : [60, 0, 0, -40]);
  const scale = useTransform(progress, w.input, i === 0 ? [1, 1, 0.96] : i === n - 1 ? [1.04, 1, 1] : [1.04, 1, 1, 0.96]);
  return (
    <motion.div className="absolute inset-0" style={{ opacity, y, scale }}>
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover object-top"
        priority={i === 0}
      />
    </motion.div>
  );
}

export default function Showcase3D({ lang }: { lang: Lang }) {
  const slides = React.useMemo(() => getSlides(lang), [lang]);
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  // entrada: a tela "deita" e vem para frente; passos: troca de projeto enquanto a seção fica fixa
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const { scrollYProgress: steps } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const rotateX = useTransform(enter, [0, 1], [38, 0]);
  const rotateY = useTransform(steps, [0, 0.5, 1], [0, -6, 6]);
  const scale = useTransform(enter, [0, 1], [0.78, 1]);
  const glow = useTransform(enter, [0, 1], [0.15, 0.55]);
  const chipFront = useTransform(steps, [0, 1], [30, -30]);
  const chipBack = useTransform(steps, [0, 1], [-20, 20]);
  const bar = useTransform(steps, [0, 1], ['0%', '100%']);

  useMotionValueEvent(steps, 'change', v => {
    const idx = Math.min(slides.length - 1, Math.floor(v * slides.length));
    setActive(prev => (prev === idx ? prev : idx));
  });

  const heading = (
    <div className="flex items-center gap-3 mb-6 md:mb-10">
      <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
        <Boxes className="w-6 h-6" />
      </div>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-mono">
        {lang === 'pt' ? 'Sistemas em Destaque' : 'Featured Systems'}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent ml-4" />
    </div>
  );

  // Movimento reduzido: grade estática, mesma informação.
  if (reduce) {
    return (
      <section id="showcase" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          {heading}
          <div className="grid gap-6 md:grid-cols-3">
            {slides.map(s => (
              <article key={s.title} className="rounded-2xl border border-stone-800 bg-stone-900/40 overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">{s.kicker} · {s.status}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-stone-400">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const s = slides[active];

  return (
    <section id="showcase" ref={ref} className="relative h-[300vh] px-6 overflow-x-clip scroll-mt-24" aria-label={lang === 'pt' ? 'Sistemas em destaque' : 'Featured systems'}>
      <div className="sticky top-0 h-screen flex flex-col justify-center py-20 md:py-0">
        <div className="max-w-6xl mx-auto w-full">
          {heading}

          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-12 items-center">
            {/* Legenda do projeto atual */}
            <div className="order-2 lg:order-1 min-h-[190px]">
              <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-400">{s.kicker}</p>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${s.live ? 'border-emerald-400/40 text-emerald-300' : 'border-amber-400/40 text-amber-300'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.live ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    {s.status}
                  </span>
                </div>
                <h3 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-white">{s.title}</h3>
                <p className="mt-4 text-stone-400 leading-relaxed max-w-md">{s.text}</p>
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-5xl md:text-6xl font-black text-cyan-400 leading-none tracking-tight">{s.metric[0]}</span>
                  <span className="pb-1 text-xs font-mono uppercase tracking-widest text-stone-500">{s.metric[1]}</span>
                </div>
              </motion.div>

              {/* Progresso */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex gap-2">
                  {slides.map((x, i) => (
                    <span key={x.title} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-cyan-400' : 'w-3 bg-stone-700'}`} />
                  ))}
                </div>
                <div className="relative h-px flex-1 max-w-[180px] bg-stone-800 overflow-hidden">
                  <motion.span className="absolute inset-y-0 left-0 bg-cyan-400/70" style={{ width: bar }} />
                </div>
              </div>
            </div>

            {/* Palco 3D */}
            <div className="order-1 lg:order-2 [perspective:1600px]">
              <motion.div
                style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
                className="relative origin-bottom will-change-transform"
              >
                <motion.div
                  aria-hidden
                  className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-cyan-500/40 via-transparent to-violet-500/40 blur-3xl"
                  style={{ opacity: glow }}
                />
                <div className="relative rounded-2xl border border-stone-700/80 bg-stone-950 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-800 bg-stone-900/90">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-stone-800/80 px-3 py-1 text-[10px] font-mono text-stone-500">
                      {lang === 'pt' ? 'dados fictícios · ambiente de demonstração' : 'fictitious data · demo environment'}
                    </span>
                  </div>
                  <div className="relative aspect-[16/9] bg-stone-900 overflow-hidden">
                    {slides.map((x, i) => (
                      <Screen key={x.title} slide={x} i={i} n={slides.length} progress={steps} />
                    ))}
                  </div>
                </div>

                {/* Chips flutuando em profundidade */}
                <motion.div
                  className="hidden sm:flex absolute -right-4 md:-right-8 top-[18%] gap-2"
                  style={{ y: chipFront, z: 80 }}
                >
                  <motion.span key={'a' + active} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full border border-cyan-400/40 bg-stone-950/90 px-3 py-1.5 text-[11px] font-mono text-cyan-300 shadow-lg backdrop-blur">
                    {s.chips[0]}
                  </motion.span>
                </motion.div>
                <motion.div
                  className="hidden sm:flex absolute -left-4 md:-left-10 bottom-[22%] flex-col gap-2"
                  style={{ y: chipBack, z: 120 }}
                >
                  {s.chips.slice(1).map(c => (
                    <motion.span key={c + active} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      className="rounded-full border border-violet-400/40 bg-stone-950/90 px-3 py-1.5 text-[11px] font-mono text-violet-300 shadow-lg backdrop-blur">
                      {c}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
