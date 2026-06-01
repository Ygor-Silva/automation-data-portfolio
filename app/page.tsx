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
  ArrowUp
} from 'lucide-react';

import FloatingChat from '../components/FloatingChat';

const InteractiveBackground = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/20 blur-[120px] rounded-full" />
      
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
      
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat mix-blend-overlay"></div>
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
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 p-3 md:p-4 bg-stone-800 border border-stone-700 hover:border-cyan-400 text-cyan-400 rounded-full shadow-xl shadow-cyan-500/10 z-50 transition-colors group"
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

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-3 mb-12">
    {Icon && <Icon className="text-cyan-400 w-8 h-8" />}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-mono">
      {children}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent ml-4" />
  </div>
);

const ProjectCard = ({ title, description, tags, link, github, image, images, githubIcon: GithubIcon = Github }: any) => {
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
    <motion.div 
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-sm flex flex-col h-full"
    >
      {/* Browser-style top bar */}
      <div className="bg-stone-900/80 px-4 py-3 border-b border-stone-800 flex items-center justify-between z-10 relative">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
        </div>
        <div className="flex gap-4">
          {github && (
            <motion.a 
              href={github} 
              target="_blank" 
              whileTap={{ scale: 0.9, opacity: 0.8 }}
              className="text-stone-500 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
          )}
          {link && (
            <motion.a 
              href={link} 
              target="_blank" 
              whileTap={{ scale: 0.9, opacity: 0.8 }}
              className="text-stone-500 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {(displayImage || images) && (
        <div className="relative aspect-[16/10] sm:aspect-video w-full border-b border-stone-800 overflow-hidden bg-stone-900/50">
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
              className="object-cover group-hover:scale-105 transition-transform duration-700 group-hover:opacity-100" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
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

          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-800 rounded-lg group-hover:bg-cyan-400/10 transition-colors">
              <Code2 className="text-stone-500 group-hover:text-cyan-400 w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{title}</h3>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-stone-600 hover:text-cyan-400 transition-colors"
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
            <span key={tag} className="text-[9px] uppercase font-mono tracking-widest px-2 py-1 bg-stone-950 text-stone-500 rounded border border-stone-800 group-hover:border-stone-700 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceItem = ({ company, role, period, description, impact, logo }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="relative pl-8 border-l border-stone-800 pb-12 last:pb-0"
  >
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">{period}</span>
    <div className="flex items-center gap-4 mb-4">
      {logo && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white border border-stone-800 overflow-hidden flex items-center justify-center p-2.5 md:p-3 transition-colors shrink-0 shadow-lg shadow-white/5"
        >
          <Image src={logo} alt={company} width={80} height={80} className="object-contain transition-all duration-300" referrerPolicy="no-referrer" />
        </motion.div>
      )}
      <h3 className="text-xl font-bold text-white leading-tight">
        {role} <br />
        <span className="text-stone-400 text-lg">@ {company}</span>
      </h3>
    </div>
    <p className="text-stone-400 text-sm leading-relaxed max-w-2xl">{description}</p>
    {impact && (
      <div className="mt-4 flex flex-wrap gap-4">
        {impact.map((item: string, i: number) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/5 px-3 py-1.5 rounded-full border border-emerald-400/10"
          >
            <Trophy className="w-3 h-3 mr-2" />
            {item}
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);

const experiences = [
  {
    period: "Dez/2025 – Atualmente",
    company: "Livrarias Curitiba",
    role: "Analista de Sistemas Pleno",
    logo: "/livrarias-curitiba.png",
    description: "Atuação direta na arquitetura e customização avançada de regras de negócio no ERP Senior (LSP/SGI), incluindo relatórios e interfaces customizadas. Responsável por desenvolver e manter fluxos de integração escaláveis via Web Services e APIs (REST/SOAP). Além disso, gerencio tecnicamente a infraestrutura de sistemas PDV em ambiente Linux, focando em estabilidade e suporte N3 para operações críticas da rede.",
    impact: ["Arquitetura de Integrações ERP", "Alta Disponibilidade PDVs (Linux)"]
  },
  {
    period: "Abr/2025 – Dez/2025",
    company: "Hepta Tecnologia",
    role: "Ticket Operations Manager / BI Analyst",
    logo: "/Logo-hepta.png",
    description: "Liderança técnica em Business Intelligence desenvolvendo soluções analíticas com Power BI para monitoramento de SLAs e KPIs operacionais. Engenharia de dados envolvendo modelagem, DAX e consultas SQL complexas. O mapeamento visual das métricas impulsionou a tomada de decisões logísticas, otimização de rotas de atendimento e reduziu substancialmente o volume de chamados de reincidência.",
    impact: ["15% melhoria em resoluções", "Geração de Insights Logísticos"]
  },
  {
    period: "Ago/2023 – Abr/2025",
    company: "Cadmus",
    role: "Ticket Operations Manager",
    logo: "/logo-cadmus.png",
    description: "Orquestração e resolução ágil de incidentes complexos de infraestrutura e sistemas corporativos. Implementei fluxos de automação de triagem e mapeamento de problemas utilizando Jira Software, incluindo automações em JQL e integrações de processos. Administração e governança de acessos via Microsoft Active Directory (AD), reduzindo o MTTR (Mean Time to Repair) geral da central de serviços.",
    impact: ["Automação de Triagem via Jira", "Redução de MTTR Global"]
  },
  {
    period: "Maio/2019 – Mar/2023",
    company: "Mercedes-Benz",
    role: "Operador de Produção (Qualidade)",
    logo: "/mercedes_logo.png",
    description: "Construção de uma base sólida em metodologias ágeis e processos escaláveis através da cultura Kaizen de melhoria contínua. Foco rigoroso na garantia de qualidade global da montagem de motores para exportação. A visão sistêmica, o detalhismo de inspeção e o raciocínio em identificar pontos de falha no pipeline logístico se tornaram os alicerces da minha transição estratégica para a análise de sistemas e desenvolvimento tech.",
    impact: ["Cultura Kaizen / Lean", "Raciocínio Sistêmico em Escala"]
  }
];

const techStack = [
  {
    category: "Automação",
    icon: Workflow,
    color: "text-cyan-400",
    skills: [
      { name: "Python", details: "Selenium, BeautifulSoup, PyAutoGUI, Requests" },
      { name: "Power Automate", details: "Desktop (RPA), Cloud Flows, Integrações" },
      { name: "N8N & Make", details: "Workflows, Webhooks, API Integrations" },
      { name: "Desenvolvimento de Bots", details: "Teams API, Discord Bots, Automação N1/N2" }
    ]
  },
  {
    category: "Dados & BI",
    icon: Database,
    color: "text-violet-400",
    skills: [
      { name: "Power BI", details: "DAX, Power Query, Modelagem de Dados e Dashboards" },
      { name: "SQL & Relacionais", details: "Oracle PL/SQL, PostgreSQL, MySQL/MariaDB" },
      { name: "Python Data Stack", details: "Pandas, NumPy, PIPELINES e Processos ETL" },
      { name: "Análise de Métricas", details: "SLA Monitoring, KPI Tracking, Data Viz" }
    ]
  },
  {
    category: "Infra & Desenvolvimento",
    icon: Terminal,
    color: "text-emerald-400",
    skills: [
      { name: "ERP Senior", details: "SGI, LSP, Customizações de Interface e Regras" },
      { name: "Linux & Servidores", details: "Ubuntu Server, Shell/Bash Scripting, Cron jobs" },
      { name: "Dev Web & APIs", details: "RESTful APIs, TypeScript, Node.js, Next.js" },
      { name: "Ferramentas Corporativas", details: "Git, Jira Software, Active Directory" }
    ]
  }
];

const projects = [
  {
    category: "Sistemas",
    title: "AuraDocs",
    description: "Acelerador de produtividade que aborda a busca lenta em sistemas de documentação complexos. Utiliza IA (Gemini) para sintetizar manuais extensos.",
    tags: ["Gemini Pro", "Supabase", "TypeScript", "AI Analysis"],
    link: "https://docu-aura-spark.lovable.app",
    github: "https://docu-aura-spark.lovable.app",
    image: "/auradocs-preview-real.png"
  },
  {
    category: "Sistemas",
    title: "DivCom",
    description: "Descomplica a rotina de profissionais comissionados em salões de beleza. Cálculo automático de comissões e relatórios de faturamento.",
    tags: ["Next.js", "PostgreSQL", "Auth", "Tailwind"],
    link: "https://divcom-101.vercel.app/login",
    github: "https://github.com/Ygor-Silva/DivCom",
    image: "/DivCom_preview.png"
  },
  {
    category: "Sistemas",
    title: "CondoFlow",
    description: "Resolve a gestão ineficiente e baseada em papel. Centraliza fluxos operacionais de condomínios, automatizando rotinas administrativas.",
    tags: ["React", "Firebase", "State Management", "UI/UX"],
    link: "https://condo-flow-eta.vercel.app",
    github: "https://github.com/Ygor-Silva/CondoFlow",
    image: "/CondoFlow_preview.png"
  },
  {
    category: "Sistemas",
    title: "NexoFin",
    description: "Dashboard analítico robusto que consolida streams de dados para oferecer controle direto sobre KPIs vitais e apoiar a rápida tomada de decisão.",
    tags: ["Data Viz", "Node.js", "Financial API", "Auth"],
    link: "https://nexo-fin.vercel.app/auth",
    github: "https://github.com/Ygor-Silva/NexoFin",
    image: "/NexoFin_preview.png"
  },
  {
    category: "Dashboards",
    title: "BI Operation Dashboard",
    description: "Reduziu um overhead massivo de relatórios manuais. Automação completa de painéis operacionais fluídos e KPIs em tempo real.",
    tags: ["Power BI", "SQL", "DAX", "Python"],
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7379670470251528192/",
    githubIcon: Linkedin,
    image: "/BI_preview.png"
  },
  {
    category: "Automação",
    title: "Bot Suporte N1/N2",
    description: "Supera gargalos de triagem inicial. Robô de atendimento que centraliza e qualifica incidentes, diminuindo o TME e o MTTR.",
    tags: ["Power Automate", "Teams API", "Python"],
    github: "https://www.linkedin.com/feed/update/urn:li:activity:7384978331571548160/",
    githubIcon: Linkedin,
    image: "/Bot_preview.png"
  },
  {
    category: "Dashboards",
    title: "Relatório Gerencial Servicedesk N1",
    description: "Análise anual detalhada da operação de servicedesk N1, com extração automatizada via Jira API. Visão holística da produtividade e ISPs.",
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
    title: "Monitoramento SLA Teams (N1)",
    description: "Dash operacional estratégico para monitoramento de SLAs em canais do Microsoft Teams. Focado em garantir resposta rápida em menos de 1h.",
    tags: ["Jira", "MS Teams", "Real-time Monitoring", "SLA"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    image: "/dash-teams/dash-teams.jpeg"
  },
  {
    category: "Dashboards",
    title: "Gestão de Saúde Operacional N1",
    description: "Dashboard estratégico conectado via API ao Jira, utilizando JQL. Apresenta ranking de chamados e filtros dinâmicos atualizados a cada 15 min.",
    tags: ["Jira API", "JQL", "Operational Health", "Management"],
    github: "https://www.linkedin.com/in/ygor-silva-developer/",
    githubIcon: Linkedin,
    images: [
      "/dash-gestao/dash-gestao.jpeg",
      "/dash-gestao/dash-gestao-2.jpeg"
    ]
  }
];

export default function Portfolio() {
  const [currentExpPage, setCurrentExpPage] = React.useState(0);
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  
  const experiencesPerPage = 2;
  const totalExpPages = Math.ceil(experiences.length / experiencesPerPage);
  
  const currentExperiences = experiences.slice(
    currentExpPage * experiencesPerPage, 
    (currentExpPage + 1) * experiencesPerPage
  );
  
  const categories = ["Todos", "Dashboards", "Automação", "Sistemas"];
  
  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="bg-[#050505] min-h-screen text-stone-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      <InteractiveBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center backdrop-blur-md bg-stone-950/20 border-b border-white/5">
        <div className="text-xl font-bold tracking-tighter text-white">
          Y<span className="text-cyan-400 text-2xl">.</span>TEIXEIRA
        </div>
        <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest uppercase text-stone-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors">Sobre</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Carreira</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projetos</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Tech</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contato</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase block mb-4">
              Disponível para novos desafios
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              YGOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">TEIXEIRA</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-400 max-w-2xl font-light leading-relaxed">
              Especialista em <span className="text-white border-b border-cyan-400/50">Automação RPA</span> e <span className="text-white border-b border-violet-400/50">Inteligência de Dados</span>. Transformando processos complexos em eficiência mensurável.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-cyan-400 transition-colors"
              >
                Ver Projetos
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <div className="flex gap-4 items-center pl-4">
                <motion.a 
                  href="https://github.com/Ygor-Silva" 
                  target="_blank" 
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  className="p-3 bg-stone-900 border border-stone-800 rounded-full hover:border-cyan-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/ygor-silva-developer/" 
                  target="_blank" 
                  whileTap={{ scale: 0.9, opacity: 0.8 }}
                  className="p-3 bg-stone-900 border border-stone-800 rounded-full hover:border-violet-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-stone-800 p-2 bg-stone-900 shadow-2xl shadow-cyan-500/10">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {/* Profile Image - Using picsum placeholder as requested photo extraction is not possible, but user can replace /ygor.jpg */}
                <Image 
                  src="/ygor.jpg" 
                  alt="Ygor Teixeira" 
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-stone-900 border border-stone-800 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Trophy className="text-cyan-400 w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-white leading-tight">Em constante <br />evolução</span>
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
          <SectionHeading icon={Workflow}>A Jornada</SectionHeading>
          <div className="col-span-full md:col-span-1">
            <div className="space-y-6 text-stone-400 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Minha base não começou diante de uma tela, mas na linha de frente industrial. Passei <span className="text-white font-semibold">5 anos na linha de produção e inspeção de qualidade na Mercedes-Benz</span>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Essa experiência moldou minha visão analítica aguçada sob o <span className="text-cyan-400 font-mono italic">Método Kaizen</span>. Aprendi que a eficiência não é apenas sobre rapidez, mas sobre a eliminação constante de desperdícios e a busca pela melhoria contínua.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Hoje, como <span className="text-white font-semibold">Analista de Sistemas Pleno</span>, aplico essa mesma filosofia de precisão industrial ao mundo do software e dados. Onde outros veem &quot;bugs&quot;, eu vejo gargalos de processo prontos para serem automatizados.
              </motion.p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-stone-900 p-8 rounded-2xl border border-stone-800 flex flex-col items-center justify-center text-center"
            >
              <span className="text-4xl font-bold text-cyan-400 mb-2">5+</span>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">Anos Industrial</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-stone-900 p-8 rounded-2xl border border-stone-800 flex flex-col items-center justify-center text-center"
            >
              <span className="text-4xl font-bold text-violet-500 mb-2">100%</span>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">Foco em Dados</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-2 bg-stone-900 p-8 rounded-2xl border border-stone-800 flex items-center gap-6"
            >
              <Factory className="w-12 h-12 text-stone-700" />
              <p className="text-sm italic text-stone-500">&quot;A qualidade deve ser construída no processo, não apenas inspecionada.&quot;</p>
            </motion.div>
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
          <SectionHeading icon={BarChart3}>Experiência & Resultados</SectionHeading>
          
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
              Página {currentExpPage + 1} de {totalExpPages}
              <span className="w-8 h-px bg-stone-800" />
            </div>
            <div className="flex gap-3 order-1 md:order-2">
              <button 
                onClick={() => setCurrentExpPage(p => Math.max(0, p - 1))}
                disabled={currentExpPage === 0}
                className="flex items-center gap-3 px-6 py-3 bg-stone-900 border border-stone-800 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-white transition-colors">Anterior</span>
              </button>
              <button 
                onClick={() => setCurrentExpPage(p => Math.min(totalExpPages - 1, p + 1))}
                disabled={currentExpPage === totalExpPages - 1}
                className="flex items-center gap-3 px-6 py-3 bg-stone-900 border border-stone-800 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group active:scale-95"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-white transition-colors">Próximo</span>
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
              <SectionHeading icon={LayoutGrid}>Projetos de Inovação</SectionHeading>
              <div className="flex flex-col gap-1 -mt-8">
                <p className="text-stone-500 text-sm max-w-xl font-mono uppercase tracking-wider">
                  Explorando a intersecção entre dados e automação
                </p>
                <p className="text-xs text-stone-600 italic font-mono flex items-center gap-1.5 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
                  Nota: Todos os dados exibidos nos dashboards são fictícios e anonimizados para fins de demonstração (Compliance LGPD).
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
                    activeCategory === cat ? 'text-white' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <span className="relative z-10">{cat}</span>
                  {activeCategory === cat && (
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
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-stone-600 font-mono italic">
              Nenhum projeto encontrado nesta categoria.
            </div>
          )}
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
          <SectionHeading icon={Cpu}>Stack Tecnológica</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
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
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
              VAMOS OTIMIZAR <br /> <span className="text-cyan-400 italic">SEU NEGÓCIO?</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-12">
              <motion.a 
                href="mailto:ygor-1996@hotmail.com" 
                whileTap={{ scale: 0.95, opacity: 0.9 }}
                className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group"
              >
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">E-mail</span>
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
            © 2026 Ygor Teixeira • Built with precision & code
          </div>
        </div>
      </motion.footer>

      <FloatingChat />
      <ScrollToTop />
    </main>
  );
}
