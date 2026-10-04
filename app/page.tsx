'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Terminal, 
  Database, 
  BarChart3, 
  Cpu, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Code2,
  Workflow,
  Factory,
  Trophy,
  ArrowUpRight,
  User,
  Filter,
  LayoutGrid,
  ArrowUp,
  BarChart2,
  PieChart,
  Maximize2,
  Sparkles,
  Rocket,
  FileText
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';

import FloatingChat from '../components/FloatingChat';
import ProjectFocusModal, { ProjectItem } from '../components/ProjectFocusModal';
import { CompanyMarquee } from '../components/CompanyMarquee';
import ResumeDownloadModal from '../components/ResumeDownloadModal';
import { 
  JarvisDataSpine, 
  Card3D, 
  ArcReactorFrame, 
  PerspectiveCyberGrid 
} from '../components/JarvisHUD';

interface CustomStatsTooltipProps {
  active?: boolean;
  payload?: any[];
  lang: 'pt' | 'en';
  totalProjects: number;
}

const CustomStatsTooltip = ({ active, payload, lang, totalProjects }: CustomStatsTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = totalProjects > 0 ? Math.round((data.count / totalProjects) * 100) : 0;
    return (
      <div className="bg-stone-900/95 border border-stone-700/80 p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs z-50">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${data.dotColor}`} />
          <span className="text-white font-bold text-sm">{data.category}</span>
        </div>
        <div className="text-stone-300 flex items-center justify-between gap-4 py-0.5">
          <span className="text-stone-400">{lang === 'pt' ? 'Projetos:' : 'Projects:'}</span>
          <span className={`font-bold ${data.accentText}`}>
            {data.count} {lang === 'pt' ? (data.count === 1 ? 'projeto' : 'projetos') : (data.count === 1 ? 'project' : 'projects')}
          </span>
        </div>
        <div className="text-stone-400 flex items-center justify-between gap-4 text-[11px] mt-1 border-t border-stone-800 pt-1">
          <span>{lang === 'pt' ? 'Participação:' : 'Portfolio Share:'}</span>
          <span className="text-stone-200 font-semibold">{percentage}%</span>
        </div>
        <div className="text-[10px] text-stone-500 mt-1 italic">
          {lang === 'pt' ? '↗ Clique para filtrar no catálogo' : '↗ Click to filter in catalog'}
        </div>
      </div>
    );
  }
  return null;
};

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <PerspectiveCyberGrid />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/15 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/15 blur-[120px] rounded-full" />
      
      {/* Interactive mouse follow glow */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] mix-blend-screen"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      <motion.div
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[80px] mix-blend-screen"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.3 }}
      />
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 p-3 md:p-4 bg-stone-900/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)] z-50 transition-all group backdrop-blur-md cursor-pointer"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const colors = {
  primary: 'cyan-400',
  secondary: 'violet-500',
  accent: 'emerald-400',
  bg: 'stone-950',
};

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any, tag?: string }) => (
  <div className="flex flex-col mb-12">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase font-mono">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent ml-4" />
    </div>
  </div>
);

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  link, 
  github, 
  image, 
  images, 
  githubIcon: GithubIcon = Github,
  onOpenFocus,
  lang = 'pt'
}: any) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!isHovered || !images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, images]);

  const activeIndex = isHovered ? currentImageIndex : 0;
  const displayImage = images && images.length > 0 ? images[activeIndex] : image;

  return (
    <Card3D glowColor="cyan" className="h-full">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpenFocus && onOpenFocus()}
        className="group relative overflow-hidden flex flex-col h-full rounded-2xl cursor-pointer"
      >
        {/* Top actions bar */}
        {(github || link) && (
          <div className="bg-stone-900/80 px-4 py-2 border-b border-stone-800 flex items-center justify-end gap-2 z-10 relative">
            {github && (
              <motion.a 
                href={github} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                whileTap={{ scale: 0.9, opacity: 0.8 }}
                className="text-stone-400 hover:text-cyan-400 transition-colors p-1"
                title="Código Fonte / Post"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
            )}
            {link && (
              <motion.a 
                href={link} 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                whileTap={{ scale: 0.9, opacity: 0.8 }}
                className="text-stone-400 hover:text-cyan-400 transition-colors p-1"
                title="Acessar Projeto"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        )}

        {(displayImage || images) && (
          <div className="relative aspect-[16/10] sm:aspect-video w-full border-b border-stone-800 overflow-hidden bg-stone-900/50 group/img">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image 
                src={displayImage} 
                alt={title} 
                fill 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={100}
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 border border-cyan-400/50 text-cyan-300 font-mono text-[11px] shadow-xl tracking-wider uppercase backdrop-blur-md">
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                {lang === 'pt' ? 'Clique para Modo Foco' : 'Click for Focus Mode'}
              </span>
            </div>
            
            {images && images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                {images.map((_: any, i: number) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-cyan-400' : 'w-1.5 bg-white/20'}`} 
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-stone-800/80 rounded-lg group-hover:bg-cyan-400/10 transition-colors">
                <Code2 className="text-stone-400 group-hover:text-cyan-400 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{title}</h3>
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-stone-500 hover:text-cyan-400 transition-colors p-1"
            >
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <p className={`text-stone-400 text-sm mb-6 leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {description}
          </p>

          {/* Expandable details with smooth height transition */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-6 border-t border-stone-800/50 mt-4">
              <p className="text-xs text-stone-500 font-mono leading-relaxed">
                Focado em eficiência operacional, automação de processos complexos e geração de valor através de inteligência de dados aplicada.
              </p>
            </div>
          </motion.div>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag: string) => (
              <span key={tag} className="text-[9px] uppercase font-mono tracking-widest px-2 py-1 bg-stone-900/90 text-stone-400 rounded border border-stone-800 group-hover:border-cyan-500/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card3D>
  );
};

const ExperienceItem = ({ company, role, period, description, impact, logo }: any) => (
  <Card3D glowColor="cyan" className="mb-6">
    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
      {logo && (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white border border-stone-800 overflow-hidden flex items-center justify-center p-2.5 md:p-3 shrink-0 shadow-lg shadow-white/5">
          <Image src={logo} alt={company} width={80} height={80} className="object-contain" referrerPolicy="no-referrer" />
        </div>
      )}
      <div className="flex-1 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-xl font-bold text-white leading-tight">
            {role} <span className="text-cyan-400 text-lg">@ {company}</span>
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full uppercase tracking-widest">
            {period}
          </span>
        </div>
        <p className="text-stone-400 text-sm leading-relaxed mb-4">{description}</p>
        {impact && (
          <div className="flex flex-wrap gap-2">
            {impact.map((item: string, i: number) => (
              <div 
                key={i} 
                className="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/5 px-3 py-1 rounded-full border border-emerald-400/20"
              >
                <Trophy className="w-3 h-3 mr-2 text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Card3D>
);

const translations = {
  pt: {
    nav: { about: "Sobre", experience: "Carreira", projects: "Projetos", stats: "Métricas", tech: "Dev", contact: "Contato", resume: "Currículo", lang: "EN" },
    hero: {
      availability: "Disponível para novos desafios",
      specialist: "Especialista em",
      rpa: "ERP Senior Sapiens",
      and: "e",
      dataInsight: "Soluções com LLM (Claude) & Automação",
      description: "Integrando a robustez dos sistemas corporativos à inteligência artificial de ponta para transformar processos complexos em eficiência mensurável.",
      viewProjects: "Ver Projetos",
      downloadCv: "Baixar Currículo",
      badge: ["Em constante", "evolução"]
    },
    about: {
      title: "A Jornada",
      p1: "Minha base técnica não começou diante de uma tela, mas na linha de frente da indústria automotiva. Passei",
      p1_bold: "5 anos na linha de montagem e inspeção de qualidade na Mercedes-Benz",
      p2: "Essa vivência consolidou minha visão sistêmica aguçada sob o",
      p2_italic: "Método Kaizen",
      p2_rest: ". Aprendi que a eficiência não é apenas sobre rapidez, mas sobre a eliminação metódica de desperdícios, padronização e busca incansável pela melhoria contínua em escala.",
      p3: "Hoje, atuo na",
      p3_bold: "Tecnolimp",
      p3_mid: "— grupo paranaense com mais de 30 anos de atuação e liderança em facilities e serviços corporativos — como",
      p3_role: "Analista & Desenvolvedor de Sistemas ERP (Senior Sapiens)",
      p3_rest: ", atuando na arquitetura de regras de negócio em LSP, customizações SGI e integrações de alta criticidade via APIs e Web Services.",
      p4: "Com profundo domínio em",
      p4_bold: "LLMs (Large Language Models) e Claude (Anthropic)",
      p4_rest: ", aplico inteligência artificial generativa na automação de processos complexos, orquestração de rotinas e engenharia de contexto. Onde outros veem rotinas lentas ou gargalos operacionais, uno o rigor do ERP à cognição das LLMs para gerar eficiência mensurável e salto de produtividade.",
      stat1: "Anos Indústria",
      stat2: "ERP & LLM Focus",
      quote: "\"A excelência não é um ato isolado, mas a sintonia contínua entre processos, sistemas de gestão e inteligência aplicada.\""
    },
    experience: {
      title: "Experiência & Resultados",
      page: "Página",
      of: "de",
      prev: "Anterior",
      next: "Próximo"
    },
    projects: {
      title: "Projetos de Inovação",
      subtitle: "Explorando a intersecção entre dados e automação",
      note: "Nota: Todos os dados exibidos nos dashboards são fictícios e anonimizados para fins de demonstração (Compliance LGPD).",
      empty: "Nenhum projeto encontrado nesta categoria.",
      all: "Todos"
    },
    stats: {
      title: "Estatísticas de Projetos",
      subtitle: "Distribuição e volume de entregas por categoria técnica",
      clickToFilter: "Clique no gráfico ou card para filtrar",
      chartTitle: "Distribuição por Categoria",
      systems: "Sistemas",
      dashboards: "Dashboards",
      automation: "Automação",
      total: "Total de Projetos",
      share: "do total",
      allCategories: "Todas as categorias ativas",
      yAxisLabel: "Eixo Y: Quantidade de Projetos",
      totalDeliverables: "entregas catalogadas",
      ctaFilter: "Filtrar no catálogo"
    },
    skills: {
      title: "Stack Tecnológica"
    },
    contact: {
      title_1: "VAMOS OTIMIZAR",
      title_2: "SEU NEGÓCIO?",
      email: "E-mail",
      footer: "© 2026 Ygor Teixeira • Built with precision & code"
    }
  },
  en: {
    nav: { about: "About", experience: "Career", projects: "Projects", stats: "Stats", tech: "Tech", contact: "Contact", resume: "Resume", lang: "PT" },
    hero: {
      availability: "Available for new challenges",
      specialist: "Specialist in",
      rpa: "Senior ERP Sapiens",
      and: "and",
      dataInsight: "LLM Solutions (Claude) & Automation",
      description: "Integrating enterprise systems resilience with cutting-edge intelligence to transform complexity into measurable efficiency.",
      viewProjects: "View Projects",
      downloadCv: "Download CV",
      badge: ["Constantly", "evolving"]
    },
    about: {
      title: "The Journey",
      p1: "My technical foundation didn't start behind a monitor, but on the automotive assembly line. I spent",
      p1_bold: "5 years on the assembly and quality inspection line at Mercedes-Benz",
      p2: "This experience forged my sharp systemic vision under the",
      p2_italic: "Kaizen Method",
      p2_rest: ". I learned that efficiency isn't just about speed, but the methodical elimination of waste, standardization, and relentless pursuit of continuous improvement at scale.",
      p3: "Today, I work at",
      p3_bold: "Tecnolimp",
      p3_mid: "— a leading Brazilian group with over 30 years of excellence in facilities and corporate services — as a",
      p3_role: "Systems & ERP (Senior Sapiens) Developer Analyst",
      p3_rest: ", architecting LSP business rules, SGI customizations, and mission-critical integrations via APIs and Web Services.",
      p4: "With deep expertise in",
      p4_bold: "Large Language Models (LLMs) and Anthropic's Claude",
      p4_rest: ", I deploy generative AI to automate complex processes, orchestrate workflows, and engineer context. Where others see manual friction or operational bottlenecks, I bridge ERP robustness with LLM cognition to deliver measurable efficiency and productivity leaps.",
      stat1: "Years Industrial",
      stat2: "ERP & LLM Focus",
      quote: "\"Excellence is not an isolated act, but the continuous harmony between processes, enterprise systems, and applied intelligence.\""
    },
    experience: {
      title: "Experience & Results",
      page: "Page",
      of: "of",
      prev: "Previous",
      next: "Next"
    },
    projects: {
      title: "Innovation Projects",
      subtitle: "Exploring the intersection of data and automation",
      note: "Note: All data displayed in dashboards are fictitious and anonymized for demonstration purposes (LGPD Compliance).",
      empty: "No projects found in this category.",
      all: "All"
    },
    stats: {
      title: "Project Statistics",
      subtitle: "Distribution and volume of deliverables by technical category",
      clickToFilter: "Click chart or card to filter",
      chartTitle: "Distribution by Category",
      systems: "Systems",
      dashboards: "Dashboards",
      automation: "Automation",
      total: "Total Projects",
      share: "of total",
      allCategories: "All active categories",
      yAxisLabel: "Y Axis: Project Count",
      totalDeliverables: "cataloged deliverables",
      ctaFilter: "Filter in catalog"
    },
    skills: {
      title: "Tech Stack"
    },
    contact: {
      title_1: "LET'S OPTIMIZE",
      title_2: "YOUR BUSINESS?",
      email: "Email",
      footer: "© 2026 Ygor Teixeira • Built with precision & code"
    }
  }
};

const getExperiences = (lang: 'pt' | 'en') => {
  return [
    {
      period: lang === 'pt' ? "Set/2026 – Atualmente" : "Sep/2026 – Present",
      company: "Tecnolimp",
      role: lang === 'pt' ? "Analista & Dev de Sistemas (ERP Senior Sapiens)" : "Systems & ERP Developer Analyst (Senior Sapiens)",
      logo: "/tecnolimp_square.svg",
      description: lang === 'pt'
        ? "Atuação como Analista e Desenvolvedor de Sistemas na matriz da Tecnolimp (líder com 30+ anos no segmento de facilities e terceirização de mão de obra qualificada). Responsável pela arquitetura, evolução e sustentação do ERP Senior (Sapiens), desenvolvimento de regras de negócio em LSP, relatórios gerenciais SGI e integrações estratégicas via APIs REST/SOAP e Web Services. Lidero também a implementação de automações e fluxos assistidos por LLMs (especialmente Claude/Anthropic) para otimização de rotinas administrativas e operacionais corporativas."
        : "Acting as Systems & ERP Developer Analyst at Tecnolimp headquarters (market leader with 30+ years in facilities and specialized outsourcing). Responsible for architecture, evolution, and maintenance of Senior ERP (Sapiens), developing LSP business rules, SGI managerial reports, and strategic integrations via REST/SOAP APIs and Web Services. I also lead the deployment of automations and LLM-assisted workflows (specifically Claude/Anthropic) to optimize administrative and corporate operational tasks.",
      impact: lang === 'pt'
        ? ["ERP Senior Sapiens (LSP/SGI)", "Soluções com LLMs (Claude)", "Governança & Integrações"]
        : ["Senior ERP Sapiens (LSP/SGI)", "LLM Solutions (Claude)", "Governance & Integrations"]
    },
    {
      period: lang === 'pt' ? "Dez/2025 – Jul/2026" : "Dec/2025 – Jul/2026",
      company: "Livrarias Curitiba",
      role: lang === 'pt' ? "Analista de Sistemas Pleno" : "Mid-level Systems Analyst",
      logo: "/livrarias-curitiba.png",
      description: lang === 'pt' 
        ? "Atuação direta na arquitetura e customização avançada de regras de negócio no ERP Senior (LSP/SGI), incluindo relatórios e interfaces customizadas. Responsável por desenvolver e manter fluxos de integração escaláveis via Web Services e APIs (REST/SOAP). Além disso, gerencio tecnicamente a infraestrutura de sistemas PDV em ambiente Linux, focando em estabilidade e suporte N3 para operações críticas da rede."
        : "Direct involvement in the architecture and advanced customization of business rules in Senior ERP (LSP/SGI), including customized reports and interfaces. Responsible for developing and maintaining scalable integration flows via Web Services and APIs (REST/SOAP). Additionally, I technically manage the POS systems infrastructure in a Linux environment, focusing on stability and L3 support for critical network operations.",
      impact: lang === 'pt' 
        ? ["Arquitetura de Integrações ERP", "Alta Disponibilidade PDVs (Linux)"]
        : ["ERP Integrations Architecture", "High Availability POS (Linux)"]
    },
    {
      period: lang === 'pt' ? "Abr/2025 – Dez/2025" : "Apr/2025 – Dec/2025",
      company: "Hepta Tecnologia",
      role: "Ticket Operations Manager / BI Analyst",
      logo: "/Logo-hepta.png",
      description: lang === 'pt'
        ? "Liderança técnica em Business Intelligence desenvolvendo soluções analíticas com Power BI para monitoramento de SLAs e KPIs operacionais. Engenharia de dados envolvendo modelagem, DAX e consultas SQL complexas. O mapeamento visual das métricas impulsionou a tomada de decisões logísticas, otimização de rotas de atendimento e reduziu substancialmente o volume de chamados de reincidência."
        : "Technical leadership in Business Intelligence developing analytical solutions with Power BI to monitor SLAs and operational KPIs. Data engineering involving modeling, DAX and complex SQL queries. Visual mapping of metrics drove logistical decision-making, optimized service routes and substantially reduced the volume of recurrent support tickets.",
      impact: lang === 'pt'
        ? ["15% melhoria em resoluções", "Geração de Insights Logísticos"]
        : ["15% improvement in resolutions", "Logistics Insights Generation"]
    },
    {
      period: lang === 'pt' ? "Ago/2023 – Abr/2025" : "Aug/2023 – Apr/2025",
      company: "Cadmus",
      role: "Ticket Operations Manager",
      logo: "/logo-cadmus.png",
      description: lang === 'pt'
        ? "Orquestração e resolução ágil de incidentes complexos de infraestrutura e sistemas corporativos. Implementei fluxos de automação de triagem e mapeamento de problemas utilizando Jira Software, incluindo automações em JQL e integrações de processos. Administração e governança de acessos via Microsoft Active Directory (AD), reduzindo o MTTR (Mean Time to Repair) geral da central de serviços."
        : "Orchestration and agile resolution of complex corporate infrastructure and systems incidents. I implemented screening automation workflows and problem mapping using Jira Software, including JQL automations and process integrations. Access administration and governance via Microsoft Active Directory (AD), reducing the overall MTTR (Mean Time to Repair) of the service desk.",
      impact: lang === 'pt'
        ? ["Automação de Triagem via Jira", "Redução de MTTR Global"]
        : ["Triage Automation via Jira", "Global MTTR Reduction"]
    },
    {
      period: lang === 'pt' ? "Maio/2019 – Mar/2023" : "May/2019 – Mar/2023",
      company: "Mercedes-Benz",
      role: lang === 'pt' ? "Operador de Produção (Qualidade)" : "Production Operator (Quality)",
      logo: "/mercedes_logo.png",
      description: lang === 'pt'
        ? "Construção de uma base sólida em metodologias ágeis e processos escaláveis através da cultura Kaizen de melhoria contínua. Foco rigoroso na garantia de qualidade global da montagem de motores para exportação. A visão sistêmica, o detalhismo de inspeção e o raciocínio em identificar pontos de falha no pipeline logístico se tornaram os alicerces da minha transição estratégica para a análise de sistemas e desenvolvimento tech."
        : "Building a solid foundation in agile methodologies and scalable processes through the Kaizen culture of continuous improvement. Strict focus on global quality assurance of engine assembly for export. The systemic vision, detailed inspection and reasoning in identifying points of failure in the logistics pipeline became the foundation of my strategic transition to systems analysis and tech development.",
      impact: lang === 'pt'
        ? ["Cultura Kaizen / Lean", "Raciocínio Sistêmico em Escala"]
        : ["Kaizen / Lean Culture", "Systemic Reasoning at Scale"]
    }
  ];
};

const getProjects = (lang: 'pt' | 'en') => [
  {
    category: "Dashboards",
    title: "Pipeline de Dados e BI Financeiro",
    description: lang === 'pt'
      ? "Pipeline ETL em Python para ingestão de arquivos bancários (CNAB240) em Oracle, com deduplicação em três camadas e validação exata contra os totais do arquivo. Estruturação da camada de dados que alimenta o dashboard de KPIs financeiros (Looker Studio)."
      : "Python ETL pipeline for banking file ingestion (CNAB240) into Oracle, with three-tier deduplication and exact validation against file totals. Structuring data layer powering financial KPI dashboards (Looker Studio).",
    tags: ["Python (Pandas)", "Oracle (PL/SQL)", "CNAB240", "ETL Batch", "Looker Studio"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    image: "/tecnolimp_brand.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "AuraDocs",
    description: lang === 'pt' 
      ? "Acelerador de produtividade que aborda a busca lenta em sistemas de documentação complexos. Utiliza IA (Gemini) para sintetizar manuais extensos."
      : "Productivity accelerator that addresses slow searches in complex documentation systems. Uses AI (Gemini) to synthesize extensive manuals.",
    tags: ["Gemini Pro", "Supabase", "TypeScript", "AI Analysis"],
    link: "https://docu-aura-spark.lovable.app",
    github: "https://docu-aura-spark.lovable.app",
    image: "/auradocs-preview-real.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "Registro de Atividades",
    description: lang === 'pt'
      ? "Sistema de registro e acompanhamento de atividades técnicas (ajustes em ERP, suporte de infraestrutura e automações) para um cliente corporativo, com geração automatizada de resumos semanais e mensais enviados à gestão."
      : "System for logging and tracking technical activities (ERP adjustments, infrastructure support, automations) for a corporate client, with automated weekly and monthly summary reports sent to management.",
    tags: ["React", "Supabase", "Vercel", "TypeScript", "Automação de Relatórios"],
    github: "https://github.com/Ygor-Silva/registro-atividades-tecnolimp",
    image: "/RegistroAtividades_preview.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "Kerdos",
    description: lang === 'pt'
      ? "Assistente financeiro pessoal especializado e inteligência de saldos com uma interface cyberpunk imersiva. Otimiza o controle de fluxos de caixa, conciliações e relatórios dinâmicos."
      : "Specialized personal financial assistant and balance intelligence with an immersive cyberpunk interface. Optimizes cash flow controls, reconciliations, and dynamic reports.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "UX/UI Cyberpunk", "Financial Intelligence"],
    github: "https://github.com/Ygor-Silva/kerdos__",
    image: "/Kerdos_preview.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "DivCom",
    description: lang === 'pt'
      ? "Descomplica a rotina de profissionais comissionados em salões de beleza. Cálculo automático de comissões e relatórios de faturamento."
      : "Simplifies the routine of commissioned professionals in beauty salons. Automatic calculation of commissions and billing reports.",
    tags: ["Next.js", "PostgreSQL", "Auth", "Tailwind"],
    link: "https://divcom-101.vercel.app/login",
    github: "https://github.com/Ygor-Silva/DivCom",
    image: "/DivCom_preview.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "CondoFlow",
    description: lang === 'pt'
      ? "Resolve a gestão ineficiente e baseada em papel. Centraliza fluxos operacionais de condomínios, automatizando rotinas administrativas."
      : "Solves inefficient, paper-based management. Centralizes condominium operational flows, automating administrative routines.",
    tags: ["React", "Firebase", "State Management", "UI/UX"],
    link: "https://condo-flow-eta.vercel.app",
    github: "https://github.com/Ygor-Silva/CondoFlow",
    image: "/CondoFlow_preview.png"
  },
  {
    category: lang === 'pt' ? "Sistemas" : "Systems",
    title: "NexoFin",
    description: lang === 'pt'
      ? "Dashboard analítico robusto que consolida streams de dados para oferecer controle direto sobre KPIs vitais e apoiar a rápida tomada de decisão."
      : "Robust analytical dashboard that consolidates data streams to offer direct control over vital KPIs and support rapid decision-making.",
    tags: ["Data Viz", "Node.js", "Financial API", "Auth"],
    link: "https://nexo-fin.vercel.app/auth",
    github: "https://github.com/Ygor-Silva/NexoFin",
    image: "/NexoFin_preview.png"
  },
  {
    category: "Dashboards",
    title: "BI Operation Dashboard",
    description: lang === 'pt'
      ? "Reduziu um overhead massivo de relatórios manuais. Automação completa de painéis operacionais fluídos e KPIs em tempo real."
      : "Reduced massive manual reporting overhead. Full automation of fluid operational panels and real-time KPIs.",
    tags: ["Power BI", "SQL", "DAX", "Python"],
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7379670470251528192/",
    githubIcon: Linkedin,
    image: "/BI_preview.png"
  },
  {
    category: lang === 'pt' ? "Automação" : "Automation",
    title: lang === 'pt' ? "Bot Suporte N1/N2" : "L1/L2 Support Bot",
    description: lang === 'pt'
      ? "Supera gargalos de triagem inicial. Robô de atendimento que centraliza e qualifica incidentes, diminuindo o TME e o MTTR."
      : "Overcomes initial triage bottlenecks. Service robot that centralizes and qualifies incidents, decreasing AHT and MTTR.",
    tags: ["Power Automate", "Teams API", "Python"],
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7384978331571548160/",
    githubIcon: Linkedin,
    image: "/Bot_preview.png"
  },
  {
    category: "Dashboards",
    title: lang === 'pt' ? "Relatório Gerencial Servicedesk N1" : "L1 Servicedesk Managerial Report",
    description: lang === 'pt'
      ? "Análise anual detalhada da operação de servicedesk N1, com extração automatizada via Jira API. Visão holística da produtividade e ISPs."
      : "Detailed annual analysis of L1 servicedesk operation, with automated extraction via Jira API. Holistic view of productivity and SLAs.",
    tags: ["Jira API", "Data Analytics", "Dashboards", "JQL"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    images: [
      "/dash-gerencial/dash_1.png",
      "/dash-gerencial/dash_2.png",
      "/dash-gerencial/dash_3.png",
      "/dash-gerencial/dash_4.png",
      "/dash-gerencial/dash_5.png"
    ]
  },
  {
    category: "Dashboards",
    title: lang === 'pt' ? "Monitoramento SLA Teams (N1)" : "Teams SLA Monitoring (L1)",
    description: lang === 'pt'
      ? "Dash operacional estratégico para monitoramento de SLAs em canais do Microsoft Teams. Focado em garantir resposta rápida em menos de 1h."
      : "Strategic operational dash for SLA monitoring in Microsoft Teams channels. Focused on ensuring quick response in under 1h.",
    tags: ["Jira", "MS Teams", "Real-time Monitoring", "SLA"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    image: "/dash-teams/dash-teams.jpeg"
  },
  {
    category: "Dashboards",
    title: lang === 'pt' ? "Gestão de Saúde Operacional N1" : "L1 Operational Health Management",
    description: lang === 'pt'
      ? "Dashboard estratégico conectado via API ao Jira, utilizando JQL. Apresenta ranking de chamados e filtros dinâmicos atualizados a cada 15 min."
      : "Strategic dashboard connected via API to Jira, using JQL. Presents ticket ranking and dynamic filters updated every 15 min.",
    tags: ["Jira API", "JQL", "Operational Health", "Management"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    images: [
      "/dash-gestao/dash-gestao.jpeg",
      "/dash-gestao/dash-gestao-2.jpeg"
    ]
  }
];

const getTechStack = (lang: 'pt' | 'en') => [
  {
    category: lang === 'pt' ? "IA & LLMs" : "AI & LLMs",
    icon: Sparkles,
    color: "text-sky-400",
    skills: [
      { name: "Claude (Anthropic)", details: lang === 'pt' ? "Claude Opus 5.5 / Sonnet 3.5, Context Window, Artifacts, MCP" : "Claude Opus 5.5 / Sonnet 3.5, Context Window, Artifacts, MCP" },
      { name: lang === 'pt' ? "Engenharia de Prompts" : "Prompt Engineering", details: lang === 'pt' ? "Few-Shot, CoT, System Prompts, Structured Outputs (JSON)" : "Few-Shot, CoT, System Prompts, Structured Outputs (JSON)" },
      { name: lang === 'pt' ? "Integração & APIs de LLMs" : "LLM APIs & Integration", details: lang === 'pt' ? "Anthropic API, Tool Use, Function Calling, Agentes Autônomos" : "Anthropic API, Tool Use, Function Calling, Autonomous Agents" },
      { name: lang === 'pt' ? "RAG & Automação Cognitiva" : "RAG & Cognitive Automation", details: lang === 'pt' ? "Embeddings, IA conectada a ERPs e automação de rotinas" : "Embeddings, AI connected to ERPs and workflow automation" }
    ]
  },
  {
    category: lang === 'pt' ? "ERP & Desenvolvimento" : "ERP & Development",
    icon: Terminal,
    color: "text-emerald-400",
    skills: [
      { name: "ERP Senior Sapiens", details: lang === 'pt' ? "LSP (Linguagem Senior), SGI, Regras de Negócio e Telas" : "LSP (Senior Language), SGI, Business Rules and UI" },
      { name: lang === 'pt' ? "Web Services & APIs" : "Web Services & APIs", details: lang === 'pt' ? "REST/SOAP, Webhooks, Middleware e Integrações ERP" : "REST/SOAP, Webhooks, Middleware and ERP Integrations" },
      { name: lang === 'pt' ? "Linux & Servidores" : "Linux & Servers", details: lang === 'pt' ? "Ubuntu/Debian, Shell/Bash Scripting, Cron, PDV Linux" : "Ubuntu/Debian, Shell/Bash Scripting, Cron, Linux POS" },
      { name: lang === 'pt' ? "Full-Stack & Ferramentas" : "Full-Stack & Tools", details: "Node.js, TypeScript, Next.js, Python, Git, Jira" }
    ]
  },
  {
    category: lang === 'pt' ? "Automação & RPA" : "Automation & RPA",
    icon: Workflow,
    color: "text-cyan-400",
    skills: [
      { name: "Python Automation", details: "Selenium, BeautifulSoup, PyAutoGUI, Requests, Headless" },
      { name: "Power Automate", details: lang === 'pt' ? "Desktop (RPA), Cloud Flows, Conectores e Gatilhos" : "Desktop (RPA), Cloud Flows, Connectors and Triggers" },
      { name: "N8N & Make", details: lang === 'pt' ? "Orquestração de Workflows, Webhooks, Integração Multi-Sistemas" : "Workflow Orchestration, Webhooks, Multi-System Integration" },
      { name: lang === 'pt' ? "Bots & Agentes de Suporte" : "Bots & Support Agents", details: lang === 'pt' ? "Teams API, Discord Bots, Triagem e Resolução N1/N2" : "Teams API, Discord Bots, L1/L2 Triage and Resolution" }
    ]
  },
  {
    category: lang === 'pt' ? "Dados & BI" : "Data & BI",
    icon: Database,
    color: "text-violet-400",
    skills: [
      { name: "Power BI", details: lang === 'pt' ? "DAX Avançado, Power Query, Modelagem Star Schema, Dashboards" : "Advanced DAX, Power Query, Star Schema Modeling, Dashboards" },
      { name: lang === 'pt' ? "SQL & Relacionais" : "SQL & Relational DBs", details: "Oracle PL/SQL, Microsoft SQL Server, PostgreSQL, MySQL" },
      { name: "Python Data Stack", details: lang === 'pt' ? "Pandas, NumPy, Pipelines ETL e Limpeza de Dados" : "Pandas, NumPy, ETL Pipelines and Data Cleaning" },
      { name: lang === 'pt' ? "Gestão de SLAs & KPIs" : "SLA & KPI Management", details: lang === 'pt' ? "Monitoramento Operacional em Tempo Real, Análise de MTTR" : "Real-time Operational Monitoring, MTTR Analysis" }
    ]
  }
];

const emptySubscribe = () => () => {};

export default function Portfolio() {
  const [lang, setLang] = React.useState<'pt' | 'en'>('pt');
  const [currentExpPage, setCurrentExpPage] = React.useState(0);
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);
  const [focusedProject, setFocusedProject] = React.useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = React.useState(false);
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  
  const t = translations[lang];
  
  const experiences = React.useMemo(() => getExperiences(lang), [lang]);
  const projects = React.useMemo(() => getProjects(lang), [lang]);
  const techStack = React.useMemo(() => getTechStack(lang), [lang]);

  const [activeCategory, setActiveCategory] = React.useState("Todos"); // Will update dynamically or keep track
  
  const experiencesPerPage = 2;
  const totalExpPages = Math.ceil(experiences.length / experiencesPerPage);
  
  const currentExperiences = experiences.slice(
    currentExpPage * experiencesPerPage, 
    (currentExpPage + 1) * experiencesPerPage
  );
  
  const categories = [t.projects.all, "Dashboards", lang === 'pt' ? "Automação" : "Automation", lang === 'pt' ? "Sistemas" : "Systems"];
  
  // Use a derived fallback for active category if it's the specific "All" label
  const currentActiveCategory = (activeCategory === "Todos" || activeCategory === "All" || activeCategory === t.projects.all) ? t.projects.all : activeCategory;

  const filteredProjects = currentActiveCategory === t.projects.all 
    ? projects 
    : projects.filter(p => p.category === currentActiveCategory);

  const statsData = React.useMemo(() => {
    const systemsCategoryName = lang === 'pt' ? "Sistemas" : "Systems";
    const automationCategoryName = lang === 'pt' ? "Automação" : "Automation";
    const dashboardsCategoryName = "Dashboards";

    const systemsCount = projects.filter(p => p.category === systemsCategoryName).length;
    const dashboardsCount = projects.filter(p => p.category === dashboardsCategoryName).length;
    const automationCount = projects.filter(p => p.category === automationCategoryName).length;

    return [
      {
        key: 'systems',
        category: systemsCategoryName,
        count: systemsCount,
        filterCategory: systemsCategoryName,
        color: '#22d3ee', // cyan-400
        strokeColor: '#06b6d4',
        accentBg: 'bg-cyan-500/10',
        accentBorder: 'border-cyan-500/30',
        accentText: 'text-cyan-400',
        dotColor: 'bg-cyan-400',
        desc: lang === 'pt' ? 'Aplicações full-stack, ERPs e ferramentas SaaS' : 'Full-stack applications, ERPs and SaaS tools'
      },
      {
        key: 'dashboards',
        category: dashboardsCategoryName,
        count: dashboardsCount,
        filterCategory: dashboardsCategoryName,
        color: '#a855f7', // violet-500
        strokeColor: '#8b5cf6',
        accentBg: 'bg-violet-500/10',
        accentBorder: 'border-violet-500/30',
        accentText: 'text-violet-400',
        dotColor: 'bg-violet-400',
        desc: lang === 'pt' ? 'Relatórios gerenciais, KPIs e análises em tempo real' : 'Management reports, KPIs and real-time analytics'
      },
      {
        key: 'automation',
        category: automationCategoryName,
        count: automationCount,
        filterCategory: automationCategoryName,
        color: '#34d399', // emerald-400
        strokeColor: '#10b981',
        accentBg: 'bg-emerald-500/10',
        accentBorder: 'border-emerald-500/30',
        accentText: 'text-emerald-400',
        dotColor: 'bg-emerald-400',
        desc: lang === 'pt' ? 'Bots RPA, fluxos de integração e automação de triagem' : 'RPA bots, integration flows and triage automation'
      }
    ];
  }, [projects, lang]);

  const handleFilterCategory = (categoryToFilter: string) => {
    setActiveCategory(categoryToFilter);
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [activeSector, setActiveSector] = React.useState('about');

  React.useEffect(() => {
    const sectionIds = ['about', 'experience', 'projects', 'project-statistics', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSector(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-stone-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      <InteractiveBackground />
      {!focusedProject && <JarvisDataSpine lang={lang} activeSection={activeSector} />}

      {/* Focus Mode Overlay Component */}
      <ProjectFocusModal
        project={focusedProject}
        allProjects={projects}
        lang={lang}
        onClose={() => setFocusedProject(null)}
        onSelectProject={(p) => setFocusedProject(p)}
      />

      {/* Resume Download Modal with Real-time Notification Alert */}
      <ResumeDownloadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        lang={lang}
      />

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 z-[100] bg-stone-900 border border-cyan-500/30 text-stone-200 px-4 py-2 rounded-full text-xs font-mono shadow-2xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-8 py-3.5 flex justify-between items-center backdrop-blur-md bg-stone-950/80 border-b border-cyan-500/10">
        <a href="#" className="text-xl md:text-2xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity">
          Y<span className="text-cyan-400">.</span>TEIXEIRA
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-7 text-xs font-mono tracking-widest uppercase text-stone-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">{t.nav.about}</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">{t.nav.experience}</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">{t.nav.projects}</a>
            <a href="#project-statistics" className="hover:text-cyan-400 transition-colors">{t.nav.stats}</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">{t.nav.tech}</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">{t.nav.contact}</a>
          </div>
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-cyan-500/30 text-stone-300 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-pointer text-xs font-mono font-medium tracking-wide shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.nav.resume}</span>
          </button>
          <button 
            onClick={() => {
              const nextLang = lang === 'pt' ? 'en' : 'pt';
              setLang(nextLang);
              setCurrentExpPage(0);
              setActiveCategory(translations[nextLang].projects.all);
              setToastMsg(nextLang === 'en' ? 'SYS.LANG: English' : 'SYS.LANG: Português');
              setTimeout(() => setToastMsg(null), 3000);
            }}
            className="flex items-center justify-center px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 transition-all cursor-pointer text-xs font-mono font-bold tracking-widest"
            aria-label="Toggle language"
          >
            [{t.nav.lang}]
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-24 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                {t.hero.availability}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6 md:mb-8 font-mono">
              YGOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">TEIXEIRA</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-300 max-w-2xl font-light leading-relaxed mx-auto md:mx-0">
              {t.hero.specialist} <span className="text-cyan-300 font-normal border-b border-cyan-400/50">{t.hero.rpa}</span> {t.hero.and} <span className="text-violet-300 font-normal border-b border-violet-400/50">{t.hero.dataInsight}</span>. {t.hero.description}
            </p>
            
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start items-center">
              <a 
                href="#projects" 
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-stone-950 font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all font-mono uppercase tracking-wider text-xs cursor-pointer"
              >
                {t.hero.viewProjects}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-stone-900/90 hover:bg-stone-850 text-stone-200 hover:text-white font-bold px-6 py-4 rounded-xl border border-stone-800 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all font-mono uppercase tracking-wider text-xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{t.hero.downloadCv}</span>
              </button>
              <div className="flex gap-4 items-center pl-0 sm:pl-4 mt-4 sm:mt-0">
                <motion.a 
                  href="https://github.com/Ygor-Silva" 
                  target="_blank" 
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  className="p-3.5 bg-stone-900/90 border border-stone-800 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition-all text-stone-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/ygor-silva-developer/" 
                  target="_blank" 
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  className="p-3.5 bg-stone-900/90 border border-stone-800 rounded-xl hover:border-violet-400 hover:text-violet-400 transition-all text-stone-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            <ArcReactorFrame>
              <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-400/40 p-2 bg-stone-950/90 shadow-2xl shadow-cyan-500/20 backdrop-blur-md relative z-10">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image 
                    src="/ygor.jpg" 
                    alt="Ygor Teixeira" 
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover transition-all duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </ArcReactorFrame>
            <div className="absolute -bottom-4 -right-4 bg-stone-900/95 border border-cyan-500/30 p-3.5 rounded-xl backdrop-blur-md shadow-xl z-20">
              <div className="flex items-center gap-3">
                <Rocket className="text-cyan-400 w-5 h-5" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white leading-tight">
                  {t.hero.badge[0]} <br />{t.hero.badge[1]}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Contextual Narrative */}
      <motion.section 
        id="about" 
        className="py-24 px-6 bg-stone-950/50 scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="col-span-full">
            <SectionHeading icon={Workflow}>{t.about.title}</SectionHeading>
          </div>
          <div className="col-span-full md:col-span-1">
            <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t.about.p1} <span className="text-white font-semibold">{t.about.p1_bold}</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t.about.p2} <span className="text-cyan-400 font-mono italic">{t.about.p2_italic}</span>{t.about.p2_rest}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t.about.p3} <span className="text-white font-semibold">{t.about.p3_bold}</span> {t.about.p3_mid} <span className="text-cyan-300 font-semibold">{t.about.p3_role}</span>{t.about.p3_rest}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t.about.p4} <span className="text-white font-semibold">{t.about.p4_bold}</span>{t.about.p4_rest}
              </motion.p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card3D glowColor="cyan">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-cyan-400 mb-2 font-mono">5+</span>
                <span className="text-xs uppercase font-mono tracking-widest text-stone-400">{t.about.stat1}</span>
              </div>
            </Card3D>
            <Card3D glowColor="violet">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-violet-400 mb-2 font-mono">100%</span>
                <span className="text-xs uppercase font-mono tracking-widest text-stone-400">{t.about.stat2}</span>
              </div>
            </Card3D>
            <Card3D glowColor="cyan" className="col-span-2">
              <div className="p-6 md:p-8 flex items-center gap-6">
                <Factory className="w-12 h-12 text-cyan-500/60 shrink-0" />
                <p className="text-sm italic text-stone-300 font-mono leading-relaxed">{t.about.quote}</p>
              </div>
            </Card3D>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        className="py-24 px-6 overflow-hidden scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeading icon={BarChart3}>{t.experience.title}</SectionHeading>
          
          <div className="min-h-[600px] transition-all duration-300">
            {currentExperiences.map((exp, index) => (
              <ExperienceItem 
                key={exp.company + index}
                period={exp.period}
                company={exp.company}
                role={exp.role}
                logo={exp.logo}
                description={exp.description}
                impact={exp.impact}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-stone-800 pt-8 gap-6">
            <div className="text-xs font-mono text-stone-500 uppercase tracking-[0.2em] flex items-center gap-4 order-2 md:order-1">
              <span className="w-8 h-px bg-stone-800" />
              {t.experience.page} {currentExpPage + 1} {t.experience.of} {totalExpPages}
              <span className="w-8 h-px bg-stone-800" />
            </div>
            <div className="flex gap-3 order-1 md:order-2">
              <button 
                onClick={() => setCurrentExpPage(p => Math.max(0, p - 1))}
                disabled={currentExpPage === 0}
                className="flex items-center gap-3 px-6 py-3 bg-stone-900 border border-stone-800 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-white transition-colors">{t.experience.prev}</span>
              </button>
              <button 
                onClick={() => setCurrentExpPage(p => Math.min(totalExpPages - 1, p + 1))}
                disabled={currentExpPage === totalExpPages - 1}
                className="flex items-center gap-3 px-6 py-3 bg-stone-900 border border-stone-800 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group active:scale-95"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-white transition-colors">{t.experience.next}</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Showcase */}
      <motion.section 
        id="projects" 
        className="py-24 px-6 bg-stone-950/20 scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="flex-1">
              <SectionHeading icon={LayoutGrid}>{t.projects.title}</SectionHeading>
              <div className="flex flex-col gap-1 -mt-8">
                <p className="text-stone-500 text-sm max-w-xl font-mono uppercase tracking-wider">
                  {t.projects.subtitle}
                </p>
                <p className="text-xs text-stone-600 italic font-mono flex items-center gap-1.5 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-cyan-500/50 shrink-0" />
                  {t.projects.note}
                </p>
              </div>
            </div>
            
            {/* Filter Bar */}
            <div className="flex overflow-x-auto no-scrollbar pb-1 md:pb-0 gap-2 bg-stone-900/50 p-1.5 rounded-2xl border border-stone-800 backdrop-blur-sm self-start max-w-full">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 relative whitespace-nowrap ${
                    currentActiveCategory === cat ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {currentActiveCategory === cat && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-cyan-500/20 border border-cyan-400/30 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                >
                  <ProjectCard 
                    {...project} 
                    lang={lang}
                    onOpenFocus={() => setFocusedProject(project)} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-stone-600 font-mono italic">
              {t.projects.empty}
            </div>
          )}
        </div>
      </motion.section>

      {/* Project Statistics Section */}
      <motion.section 
        id="project-statistics" 
        className="py-20 px-6 bg-stone-950/40 border-t border-b border-stone-800/40 scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <SectionHeading icon={BarChart2}>{t.stats.title}</SectionHeading>
              <p className="text-stone-500 text-sm max-w-xl font-mono uppercase tracking-wider -mt-8">
                {t.stats.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 bg-stone-900/60 px-3.5 py-2 rounded-xl border border-stone-800 self-start md:self-auto">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{t.stats.clickToFilter}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart Card */}
            <div 
              id="project-stats-chart-card"
              className="lg:col-span-7 bg-stone-900/40 border border-stone-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800/60">
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-mono text-sm font-bold uppercase tracking-wider">
                    {t.stats.chartTitle}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {t.stats.systems}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    {t.stats.dashboards}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {t.stats.automation}
                  </span>
                </div>
              </div>

              {/* Chart container */}
              <div id="project-stats-recharts-wrapper" className="w-full h-[280px] md:h-[300px]">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={statsData} 
                      margin={{ top: 20, right: 15, left: -20, bottom: 5 }}
                      onClick={(state: any) => {
                        if (state && state.activePayload && state.activePayload.length) {
                          const clickedItem = state.activePayload[0].payload;
                          handleFilterCategory(clickedItem.filterCategory);
                        }
                      }}
                    >
                      <defs>
                        <linearGradient id="barGrad-systems" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#0891b2" stopOpacity={0.4} />
                        </linearGradient>
                        <linearGradient id="barGrad-dashboards" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#c084fc" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
                        </linearGradient>
                        <linearGradient id="barGrad-automation" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} opacity={0.6} />
                      <XAxis 
                        dataKey="category" 
                        stroke="#737373" 
                        tickLine={false} 
                        axisLine={{ stroke: '#262626' }}
                        tick={{ fill: '#a8a29e', fontSize: 12, fontFamily: 'monospace' }}
                      />
                      <YAxis 
                        stroke="#737373" 
                        tickLine={false} 
                        axisLine={{ stroke: '#262626' }}
                        allowDecimals={false}
                        tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'monospace' }}
                      />
                      <Tooltip 
                        content={<CustomStatsTooltip lang={lang} totalProjects={projects.length} />} 
                        cursor={{ fill: 'rgba(255, 255, 255, 0.04)', radius: 8 }} 
                      />
                      <Bar 
                        dataKey="count" 
                        radius={[8, 8, 0, 0]} 
                        maxBarSize={64}
                        animationDuration={1000}
                        className="cursor-pointer"
                      >
                        {statsData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#barGrad-${entry.key})`}
                            stroke={entry.strokeColor}
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>{t.stats.yAxisLabel}</span>
                <span className="text-cyan-400/80">{projects.length} {t.stats.totalDeliverables}</span>
              </div>
            </div>

            {/* KPI Cards Breakdown */}
            <div 
              id="project-stats-kpi-container"
              className="lg:col-span-5 flex flex-col justify-between gap-4"
            >
              {/* Total KPI */}
              <div 
                id="stat-card-total"
                onClick={() => handleFilterCategory(t.projects.all)}
                className="bg-stone-900/40 border border-stone-800 hover:border-cyan-400/40 rounded-2xl p-5 backdrop-blur-sm cursor-pointer transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 block mb-1">
                      {t.stats.total}
                    </span>
                    <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors font-mono">
                      {projects.length}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">
                      100% {t.stats.share}
                    </span>
                    <p className="text-[11px] font-mono text-stone-500 mt-1">
                      {t.stats.allCategories}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Categories KPI */}
              {statsData.map((item) => {
                const percentage = projects.length > 0 ? Math.round((item.count / projects.length) * 100) : 0;
                return (
                  <div 
                    key={item.key}
                    id={`stat-card-${item.key}`}
                    onClick={() => handleFilterCategory(item.filterCategory)}
                    className="bg-stone-900/40 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 md:p-5 backdrop-blur-sm cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor}`} />
                        <h4 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">
                          {item.category}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black font-mono text-white group-hover:text-stone-200 transition-colors">
                          {item.count}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${item.accentBg} ${item.accentText} border ${item.accentBorder}`}>
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-stone-400 font-light leading-relaxed mb-3">
                      {item.desc}
                    </p>

                    {/* Mini progress bar */}
                    <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Radar */}
      <motion.section 
        id="skills" 
        className="py-24 px-6 scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Cpu}>{t.skills.title}</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {techStack.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <h3 className="text-white font-mono text-sm uppercase tracking-tighter mb-6 flex items-center gap-3">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }} 
                      transition={{ duration: 0.4 }}
                      className="cursor-pointer"
                    >
                      <Icon className={`w-6 h-6 ${section.color}`} />
                    </motion.div>
                    {section.category}
                  </h3>
                  <ul className="space-y-4">
                    {section.skills.map((s, sIdx) => (
                      <motion.li 
                        key={s.name}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 + sIdx * 0.05 }}
                        className="flex flex-col gap-1.5 text-stone-400 bg-stone-900/40 p-4 rounded-xl border border-white/5 hover:border-cyan-500/20 hover:bg-stone-800/80 transition-all duration-300 cursor-pointer shadow-lg shadow-transparent hover:shadow-cyan-500/5 group"
                      >
                        <div className="flex justify-between items-center text-stone-200 font-bold text-sm group-hover:text-cyan-400 transition-colors">
                          {s.name}
                        </div>
                        <div className="text-xs font-mono text-stone-500 leading-relaxed uppercase tracking-wide group-hover:text-stone-300 transition-colors">
                          {s.details}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Companies Logo Carousel / Trajectory Marquee */}
      <CompanyMarquee lang={lang} />

      {/* Footer / Contact */}
      <motion.footer 
        id="contact" 
        className="py-32 px-6 border-t border-white/5 scroll-mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase">
              {t.contact.title_1} <br /> <span className="text-cyan-400 italic">{t.contact.title_2}</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-12">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">
                    {lang === 'pt' ? 'CURRÍCULO' : 'RESUME'}
                  </span>
                  <span className="text-lg font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {lang === 'pt' ? 'Baixar PDF Oficial' : 'Download Official PDF'}
                  </span>
                </div>
              </button>
              <motion.a 
                href="mailto:ygor-1996@hotmail.com" 
                whileTap={{ scale: 0.95, opacity: 0.9 }}
                className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group"
              >
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">{t.contact.email}</span>
                  <span className="text-lg">ygor-1996@hotmail.com</span>
                </div>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/ygor-silva-developer/" 
                target="_blank" 
                whileTap={{ scale: 0.95, opacity: 0.9 }}
                className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group"
              >
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-violet-500/20 transition-colors">
                  <Linkedin className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">LinkedIn</span>
                  <span className="text-lg">/in/ygor-silva-developer</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
          
          <div className="mt-48 text-[10px] font-mono tracking-[0.4em] uppercase text-stone-600">
            {t.contact.footer}
          </div>
        </div>
      </motion.footer>

      {!focusedProject && (
        <>
          <FloatingChat lang={lang} />
          <ScrollToTop />
        </>
      )}
    </main>
  );
}
