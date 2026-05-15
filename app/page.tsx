'use client';

import React from 'react';
import { motion } from 'motion/react';
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
  User
} from 'lucide-react';

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

const ProjectCard = ({ title, description, tags, link, github, githubIcon: GithubIcon = Github }: any) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="group relative bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-sm"
    >
      {/* Browser-style top bar */}
      <div className="bg-stone-900/80 px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
        </div>
        <div className="flex gap-4">
          {github && <a href={github} target="_blank" className="text-stone-500 hover:text-white transition-colors"><GithubIcon className="w-4 h-4" /></a>}
          {link && <a href={link} target="_blank" className="text-stone-500 hover:text-cyan-400 transition-colors"><ExternalLink className="w-4 h-4" /></a>}
        </div>
      </div>

      <div className="p-6">
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

const ExperienceItem = ({ company, role, period, description, impact }: any) => (
  <div className="relative pl-8 border-l border-stone-800 pb-12 last:pb-0">
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 block">{period}</span>
    <h3 className="text-xl font-bold text-white">{role} @ <span className="text-stone-400">{company}</span></h3>
    <p className="text-stone-400 mt-4 text-sm leading-relaxed max-w-2xl">{description}</p>
    {impact && (
      <div className="mt-4 flex flex-wrap gap-4">
        {impact.map((item: string, i: number) => (
          <div key={i} className="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/5 px-3 py-1.5 rounded-full border border-emerald-400/10">
            <Trophy className="w-3 h-3 mr-2" />
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

const experiences = [
  {
    period: "Dez/2025 – Atualmente",
    company: "Livrarias Curitiba",
    role: "Analista de Sistemas Pleno",
    description: "Customização de regras de negócio em ERP Senior (LSP/SGI), relatórios e telas SGI. Desenvolvimento de fluxos de integração via Web Services e APIs. Gestão técnica de sistemas PDV em ambiente Linux.",
    impact: ["Manutenção ERP Senior", "Integrações via APIs"]
  },
  {
    period: "Abr/2025 – Dez/2025",
    company: "Hepta Tecnologia",
    role: "Ticket Operations Manager / BI Analyst",
    description: "Desenvolvimento de dashboards em Power BI para monitoramento de SLAs e KPIs de clientes estratégicos. Otimização do processo de gestão de tickets resultando em 20% de redução em chamados recorrentes.",
    impact: ["15% melhoria resoluções", "98% cumprimento SLA"]
  },
  {
    period: "Ago/2023 – Abr/2025",
    company: "Cadmus",
    role: "Ticket Operations Manager",
    description: "Gestão e resolução de tickets complexos, garantindo comunicação transparente. Implementação de melhorias de fluxo utilizando Jira Software e Active Directory.",
    impact: ["Eficiência em Tickets", "Gestão de Active Directory"]
  },
  {
    period: "Maio/2019 – Mar/2023",
    company: "Mercedes-Benz",
    role: "Operador de Produção (Qualidade)",
    description: "Transição de carreira fundamental. Visão industrial baseada no Método Kaizen para melhoria contínua. Supervisão de montagem e conferência de qualidade de motores para exportação.",
    impact: ["Mentalidade Kaizen", "Foco em Qualidade"]
  }
];

export default function Portfolio() {
  const [currentExpPage, setCurrentExpPage] = React.useState(0);
  const experiencesPerPage = 2;
  const totalExpPages = Math.ceil(experiences.length / experiencesPerPage);
  
  const currentExperiences = experiences.slice(
    currentExpPage * experiencesPerPage, 
    (currentExpPage + 1) * experiencesPerPage
  );

  return (
    <main className="bg-[#050505] min-h-screen text-stone-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/20 blur-[120px] rounded-full" />
      </div>

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
                <a href="https://github.com/Ygor-Silva" target="_blank" className="p-3 bg-stone-900 border border-stone-800 rounded-full hover:border-cyan-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/ygor-silva-developer/" target="_blank" className="p-3 bg-stone-900 border border-stone-800 rounded-full hover:border-violet-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
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
      <section id="about" className="py-24 px-6 bg-stone-950/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <SectionHeading icon={Workflow}>A Jornada</SectionHeading>
          <div className="col-span-full md:col-span-1">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="space-y-6 text-stone-400 text-lg leading-relaxed"
            >
              <p>
                Minha base não começou diante de uma tela, mas na linha de frente industrial. Passei <span className="text-white font-semibold">5 anos na linha de produção e inspeção de qualidade na Mercedes-Benz</span>.
              </p>
              <p>
                Essa experiência moldou minha visão analítica aguçada sob o <span className="text-cyan-400 font-mono italic">Método Kaizen</span>. Aprendi que a eficiência não é apenas sobre rapidez, mas sobre a eliminação constante de desperdícios e a busca pela melhoria contínua.
              </p>
              <p>
                Hoje, como <span className="text-white font-semibold">Analista de Sistemas Pleno</span>, aplico essa mesma filosofia de precisão industrial ao mundo do software e dados. Onde outros veem &quot;bugs&quot;, eu vejo gargalos de processo prontos para serem automatizados.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900 p-8 rounded-2xl border border-stone-800 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-cyan-400 mb-2">5+</span>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">Anos Industrial</span>
            </div>
            <div className="bg-stone-900 p-8 rounded-2xl border border-stone-800 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-violet-500 mb-2">100%</span>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">Foco em Dados</span>
            </div>
            <div className="col-span-2 bg-stone-900 p-8 rounded-2xl border border-stone-800 flex items-center gap-6">
              <Factory className="w-12 h-12 text-stone-700" />
              <p className="text-sm italic text-stone-500">&quot;A qualidade deve ser construída no processo, não apenas inspecionada.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <SectionHeading icon={BarChart3}>Experiência & Resultados</SectionHeading>
          
          <div className="min-h-[600px] transition-all duration-300">
            {currentExperiences.map((exp, index) => (
              <ExperienceItem 
                key={exp.company + index}
                period={exp.period}
                company={exp.company}
                role={exp.role}
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
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="py-24 px-6 bg-stone-950/20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Terminal}>Projetos de Inovação</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard 
              title="AuraDocs"
              description="IA de síntese inteligente de documentação. Centraliza e resume documentos complexos utilizando Gemini Pro para consultas técnicas instantâneas."
              tags={["Gemini Pro", "Supabase", "TypeScript", "AI Analysis"]}
              link="https://docu-aura-spark.lovable.app"
              github="https://docu-aura-spark.lovable.app"
            />
            <ProjectCard 
              title="DivCom"
              description="Plataforma de gestão de comunicação e divulgação. Sistema robusto com autenticação e fluxos de trabalho para centralização de avisos."
              tags={["Next.js", "PostgreSQL", "Auth", "Tailwind"]}
              link="https://divcom-101.vercel.app/login"
              github="https://github.com/Ygor-Silva/DivCom"
            />
            <ProjectCard 
              title="CondoFlow"
              description="Sistema de gestão de fluxos para condomínios. Automação de processos administrativos e monitoramento de atividades em tempo real."
              tags={["React", "Firebase", "State Management", "UI/UX"]}
              link="https://condo-flow-eta.vercel.app"
              github="https://github.com/Ygor-Silva/CondoFlow"
            />
            <ProjectCard 
              title="NexoFin"
              description="Dashboard financeiro com foco em análise de dados e autenticação segura. Interface intuitiva para controle de métricas e KPIs financeiros."
              tags={["Data Viz", "Node.js", "Financial API", "Auth"]}
              link="https://nexo-fin.vercel.app/auth"
              github="https://github.com/Ygor-Silva/NexoFin"
            />
            <ProjectCard 
              title="BI Operation Dashboard"
              description="Automação total de KPIs operacionais. Redução do tempo de reporte de horas de processos manuais para atualização em tempo real."
              tags={["Power BI", "SQL", "DAX", "Python"]}
              github="https://www.linkedin.com/feed/update/urn:li:activity:7379670470251528192/"
              githubIcon={Linkedin}
            />
            <ProjectCard 
              title="Bot Suporte N1/N2"
              description="Automação de fluxos de comunicação para suporte técnico, garantindo centralização de registros e triagem inteligente de chamados."
              tags={["Power Automate", "Teams API", "Python Pipelines"]}
              github="https://www.linkedin.com/feed/update/urn:li:activity:7384978331571548160/"
              githubIcon={Linkedin}
            />
          </div>
        </div>
      </section>

      {/* Skills Radar */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Cpu}>Stack Tecnológica</SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-white font-mono text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-400" /> Automação
              </h3>
              <ul className="space-y-4">
                {['Power Automate', 'Python (Scripts/Bots)', 'N8N', 'Selenium'].map(s => (
                  <li key={s} className="flex justify-between items-center text-stone-400 bg-stone-900/40 p-3 rounded-lg border border-white/5">
                    {s} <ChevronRight className="w-3 h-3" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-mono text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
                <Database className="w-4 h-4 text-violet-400" /> Dados
              </h3>
              <ul className="space-y-4">
                {['SQL (Oracle/PL/SQL)', 'Power BI (DAX)', 'Pandas/NumPy', 'ETL Processes'].map(s => (
                  <li key={s} className="flex justify-between items-center text-stone-400 bg-stone-900/40 p-3 rounded-lg border border-white/5">
                    {s} <ChevronRight className="w-3 h-3" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-mono text-sm uppercase tracking-tighter mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" /> Infra & ERP
              </h3>
              <ul className="space-y-4">
                {['Linux Server', 'Senior Sistemas (LSP)', 'RESTful APIs', 'Shell Scripting'].map(s => (
                  <li key={s} className="flex justify-between items-center text-stone-400 bg-stone-900/40 p-3 rounded-lg border border-white/5">
                    {s} <ChevronRight className="w-3 h-3" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 border-t border-white/5">
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
              <a href="mailto:ygor-1996@hotmail.com" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">E-mail</span>
                  <span className="text-lg">ygor-1996@hotmail.com</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/ygor-silva-developer/" target="_blank" className="flex items-center gap-3 text-stone-400 hover:text-white transition-colors group">
                <div className="p-4 bg-stone-900 rounded-full group-hover:bg-violet-500/20 transition-colors">
                  <Linkedin className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-widest block text-stone-500 font-mono">LinkedIn</span>
                  <span className="text-lg">/in/ygor-silva-developer</span>
                </div>
              </a>
            </div>
          </motion.div>
          
          <div className="mt-48 text-[10px] font-mono tracking-[0.4em] uppercase text-stone-600">
            © 2026 Ygor Teixeira • Built with precision & code
          </div>
        </div>
      </footer>
    </main>
  );
}
