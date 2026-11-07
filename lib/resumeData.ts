export interface ResumeData {
  name: string;
  title: string;
  email: string;
  location: string;
  linkedin: string;
  portfolio: string;
  profile: string;
  highlights: string[];
  experiences: {
    role: string;
    period: string;
    company: string;
    bullets: string[];
  }[];
  consultingProjects: {
    title: string;
    client: string;
    year: string;
    bullets: string[];
  }[];
  education: {
    course: string;
    institution: string;
    period: string;
  }[];
  skills: {
    category: string;
    items: string;
  }[];
}

export const resumeData: ResumeData = {
  name: "YGOR TEIXEIRA",
  title: "Analista & Desenvolvedor de Sistemas | ERP Senior, Full-Stack e IA",
  email: "ygor-1996@hotmail.com",
  location: "Curitiba, PR · Remoto",
  linkedin: "https://www.linkedin.com/in/ygor-silva-developer/",
  portfolio: "https://ygor-teixeira-portfolio.vercel.app",
  profile: "Analista e Desenvolvedor de Sistemas que conecta o ERP Senior (Sapiens) ao dia a dia da operação. Desenvolvo regras em LSP e integrações REST/SOAP e construo sistemas web full-stack (Next.js, TypeScript, Supabase/PostgreSQL, Python) com segurança aplicada no banco (RLS, RBAC, LGPD) e testes automatizados. Trago base sólida em BI (Power BI, SQL/PL-SQL) e operação orientada a SLA, e uso IA (Claude Code) com padrão de qualidade e segurança.",
  highlights: [
    "SaaS multi-tenant de gestão de frotas com isolamento por cliente (RLS), RBAC com 6 papéis, 109 testes automatizados e auditoria de segurança com nível de 90%.",
    "Portal corporativo de relatórios integrado ao ERP Oracle por workers Python, com permissão por papel aplicada no banco e 49 migrations versionadas.",
    "98% de cumprimento de SLA e redução de 20% em chamados recorrentes a partir da análise de dados históricos de incidentes (Hepta).",
    "Dashboards em Power BI para monitoramento de SLAs e KPIs de 8 clientes estratégicos, com melhoria de 15% na velocidade de resolução de incidentes (Hepta)."
  ],
  experiences: [
    {
      role: "Analista & Desenvolvedor de Sistemas (ERP Senior Sapiens)",
      period: "Set/2026 – Atual",
      company: "Tecnolimp",
      bullets: [
        "Sustentação e evolução do ERP Senior (Sapiens): regras de negócio em LSP, relatórios SGI e integrações REST/SOAP e Web Services.",
        "Portal corporativo de relatórios (RH, Financeiro, Operações, TI): workers Python leem o Oracle e publicam por fila no Supabase; permissão por área, relatório e papel via RLS; testes E2E com Playwright.",
        "Férias & Coberturas: planejamento, sugestão de cobertura por geocodificação, cálculo de saldo de recesso em Python e trava de demissão via web service SOAP do Senior.",
        "SaaS multi-tenant de frotas (Next.js 16, PostgreSQL/RLS, GitHub Actions, Docker) e app PWA de registro em campo com sync bidirecional com o ERP.",
        "Padronização do desenvolvimento com IA (Claude Code): subagentes por complexidade, skills e auditoria de segurança em 12 riscos."
      ]
    },
    {
      role: "Analista de Sistemas Pleno",
      period: "Dez/2025 – Jul/2026",
      company: "Livrarias Curitiba",
      bullets: [
        "Sustentação do ERP Senior: análise e resolução de incidentes, customização de regras de negócio (LSP), relatórios e telas SGI nos módulos Gestão Empresarial e Vetorh.",
        "Escrita e depuração de queries e transações complexas em PL/SQL (Oracle) para investigar inconsistências e otimizar processos.",
        "Integrações com fornecedores via Web Services e APIs; atendimento a usuários e documentação dos recursos desenvolvidos."
      ]
    },
    {
      role: "Analista de Sistemas Pleno / Suporte Especializado",
      period: "Abr/2025 – Dez/2025",
      company: "Hepta Tecnologia e Informática",
      bullets: [
        "Desenvolvimento e manutenção de dashboards em Power BI (DAX, Power Query) para monitoramento de SLAs e KPIs de 8 clientes estratégicos.",
        "Atendimento de incidentes e requisições em processo ITSM, com acompanhamento de prazos: 98% de cumprimento de SLA.",
        "Análise de dados históricos de chamados para identificar causas recorrentes, resultando em redução de 20% no volume de incidentes repetidos.",
        "Extração de dados do Jira via SQL e JQL e tratamento com Python (Pandas), eliminando a geração manual de relatórios.",
        "Documentação técnica (POPs) de incidentes e procedimentos, fortalecendo a Base de Conhecimento da equipe."
      ]
    },
    {
      role: "Ticket Operations Manager",
      period: "Ago/2023 – Abr/2025",
      company: "Cadmus",
      bullets: [
        "Triagem e resolução de chamados no Jira Software, com análise de dados de atendimento para identificar tendências e melhorias de processo."
      ]
    },
    {
      role: "Operador de Produção",
      period: "Mai/2019 – Mar/2023",
      company: "Mercedes-Benz",
      bullets: [
        "Conferência de qualidade de motores para exportação, com melhoria contínua (Kaizen)."
      ]
    }
  ],
  consultingProjects: [
    {
      title: "Pipeline de Dados e BI Financeiro",
      client: "Cliente Tecnolimp",
      year: "2026",
      bullets: [
        "Pipeline ETL em Python para ingestão de arquivos bancários (CNAB240) em Oracle, com deduplicação em três camadas e validação exata contra os totais do arquivo.",
        "Estruturação da camada de dados que alimenta o dashboard de KPIs financeiros (Looker Studio)."
      ]
    },
    {
      title: "Sistema de Registro de Atividades Técnicas",
      client: "Cliente corporativo",
      year: "2026",
      bullets: [
        "Sistema de registro e acompanhamento de atividades (ajustes em ERP, suporte de infraestrutura e automações), com relatórios semanais e mensais automatizados para a gestão (React, Supabase, Vercel)."
      ]
    }
  ],
  education: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "Universidade Estácio de Sá",
      period: "2023–2027 (em andamento)"
    },
    {
      course: "Full Stack Developer",
      institution: "EBAC – Escola Britânica de Artes Criativas e Tecnologia",
      period: "2022–2023"
    }
  ],
  skills: [
    {
      category: "Desenvolvimento",
      items: "Next.js, React, TypeScript, Node.js, Python, PostgreSQL/Supabase (RLS, RBAC, multi-tenant), Playwright, Vitest, GitHub Actions, Docker"
    },
    {
      category: "IA aplicada",
      items: "Claude Code (subagentes, skills, MCP), Anthropic API, engenharia de prompts"
    },
    {
      category: "BI e Dados",
      items: "Power BI (DAX, Power Query), SQL, PL/SQL (Oracle), Python (Pandas), Looker Studio"
    },
    {
      category: "Sustentação e ITSM",
      items: "ITIL, gestão de incidentes e requisições, SLA, Jira Software (JQL), documentação de incidentes"
    },
    {
      category: "Automação e Integração",
      items: "Power Automate, N8N, Web Services/APIs, ERP Senior (CBDS, LSP)"
    },
    {
      category: "Idiomas",
      items: "Português (nativo), Inglês (básico)"
    }
  ]
};
