'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Workflow, 
  BarChart3, 
  Server, 
  FileCode2, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layers, 
  Activity,
  CheckCircle,
  Clock,
  Terminal
} from 'lucide-react';

export interface ArchitectureNode {
  id: string;
  step: number;
  name: string;
  category: 'source' | 'processing' | 'storage' | 'output';
  tech: string[];
  protocol: string;
  summary: string;
  engineeringRules: string[];
  slaOrLatency: string;
}

export interface ProjectBlueprint {
  projectTitle: string;
  systemName: string;
  architectureType: string;
  nodes: ArchitectureNode[];
}

const blueprintsMap: Record<string, ProjectBlueprint> = {
  // 1. Pipeline CNAB240 & BI Financeiro (Tecnolimp)
  "Pipeline de Dados e BI Financeiro": {
    projectTitle: "Pipeline de Dados e BI Financeiro",
    systemName: "FIN-DATA-INGEST.SYS",
    architectureType: "Pipeline ETL Batch com Deduplicação Tripla & BI",
    nodes: [
      {
        id: "ingest",
        step: 1,
        name: "Ingestão de Arquivos Bancários",
        category: "source",
        tech: ["Arquivos CNAB240", "SFTP Seguro", "Python OS Watcher"],
        protocol: "Batch CNAB240 (Posicional)",
        summary: "Monitoramento contínuo de diretórios seguros e captura de extratos bancários brutos de remessa e retorno.",
        engineeringRules: [
          "Validação de integridade de hash SHA-256 no recebimento do arquivo",
          "Checagem estrita de cabeçalho (Header de Arquivo e Header de Lote)",
          "Rejeição preventiva em caso de formatação truncada"
        ],
        slaOrLatency: "Execução diária programada / < 120s"
      },
      {
        id: "etl",
        step: 2,
        name: "Engine ETL & Deduplicação",
        category: "processing",
        tech: ["Python 3.11", "Pandas", "Hashlib"],
        protocol: "In-memory Parallel Processing",
        summary: "Processamento analítico dos registros, normalização de tipos e algoritmo de deduplicação em 3 camadas.",
        engineeringRules: [
          "Deduplicação Nível 1: Identificador único da transação bancária",
          "Deduplicação Nível 2: Hash composto (Conta + Data + Valor + Documento)",
          "Deduplicação Nível 3: Validação de conciliação retroativa",
          "Conferência matemática exata contra o trailer do arquivo bancário"
        ],
        slaOrLatency: "99.9% de precisão contábil"
      },
      {
        id: "storage",
        step: 3,
        name: "Data Warehouse & Staging Oracle",
        category: "storage",
        tech: ["Oracle Database", "PL/SQL", "Tabelas Particionadas"],
        protocol: "Transacional ACID / Bulk Insert",
        summary: "Carga atômica dos dados limpos em schemas corporativos estruturados com isolamento por exercício.",
        engineeringRules: [
          "Transações atômicas com rollback total se houver divergência de centavos",
          "Views materializadas com índices B-Tree para alta velocidade analítica",
          "Registro permanente em log de auditoria operacional"
        ],
        slaOrLatency: "Gravação atômica em < 3.5s"
      },
      {
        id: "bi",
        step: 4,
        name: "Camada Analítica & KPIs Financeiros",
        category: "output",
        tech: ["Looker Studio", "Dashboards Executivos", "KPIs de Fluxo"],
        protocol: "Direct Connector / Scheduled Refresh",
        summary: "Painéis dinâmicos para a diretoria com métricas de liquidez, conciliação e fluxo de caixa.",
        engineeringRules: [
          "Filtros de corte temporal por centro de custo e banco",
          "Drill-down de auditoria até a transação de origem",
          "Alertas automáticos para anomalias em liquidações pendentes"
        ],
        slaOrLatency: "Dashboards atualizados automaticamente"
      }
    ]
  },

  // 2. Registro de Atividades Técnicas
  "Registro de Atividades": {
    projectTitle: "Registro de Atividades",
    systemName: "TECH-ACTIVITY-CORE",
    architectureType: "Fullstack Serverless & Automação de Relatórios",
    nodes: [
      {
        id: "ui",
        step: 1,
        name: "Interface Operacional React",
        category: "source",
        tech: ["React", "TypeScript", "Tailwind CSS", "Vercel Edge"],
        protocol: "HTTPS / REST Client",
        summary: "PWA rápido e responsivo para analistas registrarem chamados, horas e tipos de intervenção técnica.",
        engineeringRules: [
          "Formulários com validação estrita de esquemas em tempo real",
          "Cache offline local para evitar perda de dados durante oscilações de rede"
        ],
        slaOrLatency: "Carregamento < 0.8s"
      },
      {
        id: "backend",
        step: 2,
        name: "Backend Serverless & Auth",
        category: "processing",
        tech: ["Supabase Auth", "PostgREST", "Row Level Security (RLS)"],
        protocol: "JWT Bearer / Realtime WebSockets",
        summary: "Gerenciamento seguro de permissões baseado em papéis (RBAC) com isolamento estrito de dados por equipe.",
        engineeringRules: [
          "Políticas de RLS impedem acesso cruzado entre contratos",
          "Triggers em PostgreSQL auditam todas as edições de atividades"
        ],
        slaOrLatency: "Resposta de API ~45ms"
      },
      {
        id: "db",
        step: 3,
        name: "Banco Relacional & Views Analíticas",
        category: "storage",
        tech: ["PostgreSQL", "Database Triggers", "Aggregated Views"],
        protocol: "PostgreSQL Native",
        summary: "Modelagem dimensional para consultas de produtividade, categorização por módulo ERP e SLA.",
        engineeringRules: [
          "Índices compostos em colunas de data e analista responsável",
          "Views calculadas para consolidação rápida semanal/mensal"
        ],
        slaOrLatency: "Queries agregadas em < 20ms"
      },
      {
        id: "automation",
        step: 4,
        name: "Geração Automatizada de Relatórios",
        category: "output",
        tech: ["Automação N8N/Node", "Disparo de Relatórios", "Gestão Corporativa"],
        protocol: "Cron Trigger / Email & Webhook",
        summary: "Consolidação automática e envio de resumos de horas e sustentação direto à gerência e diretoria.",
        engineeringRules: [
          "Disparo pontual todo início de semana e fechamento de mês",
          "Eliminação de 100% do tempo gasto em elaboração manual de relatórios"
        ],
        slaOrLatency: "Economia de ~15h semanais da gestão"
      }
    ]
  },

  // 3. BI Operation Dashboard (Hepta)
  "BI Operation Dashboard": {
    projectTitle: "BI Operation Dashboard",
    systemName: "SLA-INSIGHT-POWERBI",
    architectureType: "Enterprise BI Pipeline para 8 Clientes Estratégicos",
    nodes: [
      {
        id: "jira",
        step: 1,
        name: "Extração de Incidentes (Jira API)",
        category: "source",
        tech: ["Jira REST API", "JQL Dinâmico", "Python Collector"],
        protocol: "REST OAuth 2.0 / Pagination",
        summary: "Extração programada de incidentes, requisições, tempo de SLA e histórico de transições de status.",
        engineeringRules: [
          "Extração incremental para minimizar carga no servidor Jira",
          "Normalização de campos customizados e métricas de MTTR"
        ],
        slaOrLatency: "Sincronização a cada 15 min"
      },
      {
        id: "prep",
        step: 2,
        name: "Limpeza & Modelagem de Dados",
        category: "processing",
        tech: ["Python Pandas", "Power Query", "Data Modeling"],
        protocol: "Star Schema Transformation",
        summary: "Construção de tabelas Fato (Incidentes) e Dimensões (Cliente, Especialista, SLA, Severidade).",
        engineeringRules: [
          "Eliminação de duplicidades e reaberturas artificiais",
          "Cálculo padronizado de calendário útil e horários comerciais"
        ],
        slaOrLatency: "Transformação limpa e auditada"
      },
      {
        id: "engine",
        step: 3,
        name: "Cálculo Avançado DAX",
        category: "storage",
        tech: ["DAX", "Power BI Tabular Engine", "VertiPaq Storage"],
        protocol: "In-memory Columnar Compression",
        summary: "Métricas temporais dinâmicas: % Cumprimento de SLA, MTTR real, volume de reincidência e produtividade.",
        engineeringRules: [
          "Otimização de medidas DAX para resposta instantânea em filtros",
          "Row-level Security (RLS) para isolar métricas por cliente"
        ],
        slaOrLatency: "Renderização do painel < 1.2s"
      },
      {
        id: "dash",
        step: 4,
        name: "Tomada de Decisão & Redução de Chamados",
        category: "output",
        tech: ["Power BI Service", "Alertas em Tempo Real", "Executive View"],
        protocol: "HTTPS / Multi-tenant Portal",
        summary: "Painel interativo para acompanhamento dos 8 clientes com indicadores preditivos de gargalos.",
        engineeringRules: [
          "Identificação precoce de tendências de reincidência (-20% chamados)",
          "Melhoria comprovada de 15% na velocidade de resolução de incidentes",
          "Taxa consistente de 98% de cumprimento de SLA"
        ],
        slaOrLatency: "98% cumprimento de SLA garantido"
      }
    ]
  },

  // 4. Kerdos
  "Kerdos": {
    projectTitle: "Kerdos",
    systemName: "KERDOS-FIN-INTELLIGENCE",
    architectureType: "Motor de Conciliação e Assistência Financeira",
    nodes: [
      {
        id: "src",
        step: 1,
        name: "Entrada de Movimentações & Extratos",
        category: "source",
        tech: ["CSV/OFX Parser", "Formulários Rápidos", "APIs Bancárias"],
        protocol: "Client-side Parsing & Sanitization",
        summary: "Leitura de múltiplos extratos, categorização preliminar e sanitização de transações.",
        engineeringRules: ["Validação de balanço de abertura e fechamento", "Detecção de transações duplicadas"],
        slaOrLatency: "Processamento instantâneo no cliente"
      },
      {
        id: "engine",
        step: 2,
        name: "Engine de Projeção & Fluxo de Caixa",
        category: "processing",
        tech: ["TypeScript", "Algoritmos Preditivos", "State Engine"],
        protocol: "Reactive In-Memory Computations",
        summary: "Cálculo em tempo real de saldos futuros, previsões de despesas fixas e simulações de cenários.",
        engineeringRules: ["Cálculo com precisão de ponto fixo sem erros de arredondamento IEEE-754"],
        slaOrLatency: "Tempo de recálculo < 10ms"
      },
      {
        id: "storage",
        step: 3,
        name: "Persistência Criptografada",
        category: "storage",
        tech: ["Local Storage Criptografado", "IndexedDB", "Cloud Sync"],
        protocol: "AES-GCM / Strict Privacy",
        summary: "Armazenamento seguro onde apenas o usuário possui a chave de decriptação dos registros.",
        engineeringRules: ["Zero-knowledge architecture para segurança total de dados financeiros"],
        slaOrLatency: "I/O assíncrono não-bloqueante"
      },
      {
        id: "ui",
        step: 4,
        name: "Dashboard Cyberpunk & Recomendações",
        category: "output",
        tech: ["Next.js", "Tailwind CSS", "HUD HUD Data Viz"],
        protocol: "Reactive DOM / 60 FPS",
        summary: "Interface cibernética rica com gráficos de tendência, velocímetros de orçamento e diagnósticos de sobra.",
        engineeringRules: ["Componentes desacoplados com memoização rigorosa para manter 60 FPS estáveis"],
        slaOrLatency: "Interface fluida a 60 FPS"
      }
    ]
  },

  // 5. Rodaz — SaaS multi-tenant de frotas
  "Rodaz · SaaS de Gestão de Frotas": {
    projectTitle: "Rodaz · SaaS de Gestão de Frotas",
    systemName: "RODAZ-FLEET-SAAS",
    architectureType: "SaaS Multi-tenant White-label com Segurança no Banco",
    nodes: [
      { id: "ui", step: 1, name: "App Next.js 16 (App Router)", category: "source",
        tech: ["Next.js 16", "React 19", "Tailwind 4", "React Hook Form"], protocol: "Server Components / HTTPS",
        summary: "Interface responsiva (360 a 1024 px) com branding por tenant via tokens de design — nenhuma marca de cliente no código.",
        engineeringRules: ["Menu lista só módulos implementados (sem telas falsas)", "Cores apenas por tokens, nunca hex em componente"],
        slaOrLatency: "E2E responsivo validado com Playwright" },
      { id: "actions", step: 2, name: "Server Actions + Validação Dupla", category: "processing",
        tech: ["Server Actions", "Zod 4", "can() / RBAC"], protocol: "RPC tipado (Server Actions)",
        summary: "Toda mutação valida o payload com Zod e checa a permissão no app antes de chegar ao banco, que revalida tudo.",
        engineeringRules: ["Permissões espelhadas em TS e SQL com teste de paridade", "Regras puras na camada domain, com teste unitário"],
        slaOrLatency: "49 testes unitários (Vitest)" },
      { id: "db", step: 3, name: "PostgreSQL + RLS Multi-tenant", category: "storage",
        tech: ["Supabase", "PostgreSQL 16", "RLS", "Triggers"], protocol: "PostgREST / SQL",
        summary: "tenant_id imutável em toda tabela de negócio e policies com is_member/has_permission; bloqueio de login após 3 tentativas imposto no banco.",
        engineeringRules: ["Nunca confiar só no filtro do app", "Trigger genérico de auditoria em cada alteração"],
        slaOrLatency: "60 testes de banco (IDOR/BOLA, LGPD)" },
      { id: "ci", step: 4, name: "CI/CD & Entrega", category: "output",
        tech: ["GitHub Actions", "Docker multi-stage", "Vercel / VM Ubuntu"], protocol: "Pipeline lint → typecheck → test → build",
        summary: "Cada PR roda lint, typecheck, testes unitários e de banco (Postgres 16) e build; imagem standalone para nuvem ou VM própria.",
        engineeringRules: ["Gate verde obrigatório antes do merge", "Decisões registradas em ADRs"],
        slaOrLatency: "Auditoria de segurança: nível 90%" }
    ]
  },

  // 6. Portal corporativo de relatórios
  "Portal Corporativo de Relatórios": {
    projectTitle: "Portal Corporativo de Relatórios",
    systemName: "CENTRAL-REPORTS-HUB",
    architectureType: "ERP Oracle → Fila → Supabase, com Permissão no Banco",
    nodes: [
      { id: "erp", step: 1, name: "ERP Oracle (Senior Sapiens)", category: "source",
        tech: ["Oracle", "Senior Sapiens", "Web Services"], protocol: "Somente leitura (SELECT)",
        summary: "Fonte oficial de folha, quadro de vagas, férias e desligamentos. O portal nunca conecta direto no Oracle.",
        engineeringRules: ["Credencial do Oracle só no worker interno", "Escrita no ERP apenas por web service"],
        slaOrLatency: "Zero escrita direta no ERP" },
      { id: "worker", step: 2, name: "Workers Python sob Demanda", category: "processing",
        tech: ["Python", "oracledb", "pandas", "zeep (SOAP)"], protocol: "Fila por RPC (pedido → processamento → resultado)",
        summary: "O clique do usuário vira um pedido na fila; o worker consulta o Oracle, agrega e publica o espelho no Supabase.",
        engineeringRules: ["Resultados só com agregados quando não precisa de dado pessoal", "Retenção curta e auditoria dos pedidos"],
        slaOrLatency: "Atualização sob demanda" },
      { id: "db", step: 3, name: "Supabase + RLS por Papel", category: "storage",
        tech: ["PostgreSQL", "RLS", "RPCs security definer", "Edge Function"], protocol: "PostgREST / JWT",
        summary: "Permissão por área, relatório e papel (RH, gestor, TI) aplicada no banco; rate-limit de login por IP e senha temporária.",
        engineeringRules: ["Gestor não vê CID nem endereço (LGPD)", "49 migrations versionadas e testadas"],
        slaOrLatency: "Auditoria de segurança: 94%, sem crítico" },
      { id: "ui", step: 4, name: "Portal Web Responsivo", category: "output",
        tech: ["HTML/CSS/JS", "Playwright E2E", "Impressão A4"], protocol: "SPA estática (sem build)",
        summary: "Home por áreas, busca global, painéis com impressão A4 e base de conhecimento com busca tolerante a acento, erro e sinônimos.",
        engineeringRules: ["Teste de regressão de XSS", "Busca validada com meta de 95% de acerto"],
        slaOrLatency: "Testes E2E em cada tela" }
    ]
  },

  // 7. Férias & Coberturas
  "Férias & Coberturas": {
    projectTitle: "Férias & Coberturas",
    systemName: "HR-VACATION-COVERAGE",
    architectureType: "Regras Trabalhistas + Geocodificação + Web Service do ERP",
    nodes: [
      { id: "erp", step: 1, name: "Dados do ERP (Férias e Afastamentos)", category: "source",
        tech: ["Oracle", "R034FUN / R040PER / R038AFA"], protocol: "Somente leitura",
        summary: "Períodos aquisitivos, programações e afastamentos lidos do Sapiens, sem nunca inventar tabela ou campo.",
        engineeringRules: ["Schema legado mapeado e confirmado com consulta", "Oracle somente leitura"],
        slaOrLatency: "3 empresas do grupo" },
      { id: "calc", step: 2, name: "Motor de Regras em Python", category: "processing",
        tech: ["Python", "pandas"], protocol: "Batch sob demanda",
        summary: "Cálculo de avos, saldo de recesso (janela de 2 anos) e alertas de férias vencidas, conciliado com a planilha oficial do RH.",
        engineeringRules: ["Regras levantadas e validadas com o RH", "Diferenças de conciliação documentadas"],
        slaOrLatency: "Substitui relatório legado" },
      { id: "cover", step: 3, name: "Sugestão de Cobertura", category: "storage",
        tech: ["Geocodificação IBGE/CNEFE", "ViaCEP", "Supabase"], protocol: "Ranking por proximidade e aderência",
        summary: "Sugere quem cobre cada posto por distância, cargo, horário e empresa; bloqueios eliminatórios e riscos exigem ciência e motivo.",
        engineeringRules: ["Indicação manual sempre com classificação + motivo", "Histórico de toda alteração"],
        slaOrLatency: "Decisão auditável" },
      { id: "ws", step: 4, name: "Trava de Demissão via Web Service", category: "output",
        tech: ["SOAP (zeep)", "Senior Web Services"], protocol: "SOAP / XML",
        summary: "Pedido de demissão de quem está de férias, planejado ou cobrindo férias é travado e vai ao RH; aprovação segue pelo web service do ERP.",
        engineeringRules: ["Nunca INSERT/UPDATE direto no ERP", "Auditoria JSONL e checagem de duplicidade"],
        slaOrLatency: "12 testes do web service" }
    ]
  },

  // 8. App de Campo (PWA)
  "App de Campo (PWA)": {
    projectTitle: "App de Campo (PWA)",
    systemName: "FIELD-ACTIONS-PWA",
    architectureType: "PWA Mobile + Fila de Integração Bidirecional",
    nodes: [
      { id: "pwa", step: 1, name: "PWA Mobile-first", category: "source",
        tech: ["Next.js 14", "TypeScript", "Tiptap", "Service Worker"], protocol: "HTTPS / PWA",
        summary: "Gestor registra no local a ação, o centro de custo, as pessoas envolvidas e até 5 fotos comprimidas no próprio celular.",
        engineeringRules: ["Fotos reduzidas a 1600 px / JPEG 80% antes do envio", "Edição liberada só por 2 h"],
        slaOrLatency: "Pensado para 4G em campo" },
      { id: "db", step: 2, name: "Supabase (RLS + Storage privado)", category: "processing",
        tech: ["PostgreSQL", "RLS", "Storage", "Triggers"], protocol: "PostgREST / JWT",
        summary: "Autor e janela de edição preenchidos e impostos pelo banco; fotos em bucket privado.",
        engineeringRules: ["RLS em todas as tabelas", "Auditoria de eventos"],
        slaOrLatency: "Regras no banco, não só na tela" },
      { id: "queue", step: 3, name: "Fila de Integração", category: "storage",
        tech: ["Edge Functions (Deno)", "Status PENDENTE → ENVIADA/ERRO"], protocol: "Fila com reenvio",
        summary: "Cada registro entra numa fila com status e reenvio automático; service_role isolado no servidor.",
        engineeringRules: ["Arquitetura em camadas (domain/infra)", "Troca de provedor por interface"],
        slaOrLatency: "Ciclo de 30 min" },
      { id: "erp", step: 4, name: "ERP Oracle", category: "output",
        tech: ["Python", "oracledb", "Agendador Windows"], protocol: "Sync bidirecional",
        summary: "Worker envia os registros ao ERP e devolve locais e colaboradores atualizados ao app.",
        engineeringRules: ["Rodapé mostra a última atualização com o ERP", "Erros visíveis e reprocessáveis"],
        slaOrLatency: "Oracle ↔ Supabase" }
    ]
  }
};

// Títulos em inglês apontam para o mesmo blueprint
blueprintsMap["Rodaz · Fleet Management SaaS"] = blueprintsMap["Rodaz · SaaS de Gestão de Frotas"];
blueprintsMap["Corporate Reporting Portal"] = blueprintsMap["Portal Corporativo de Relatórios"];
blueprintsMap["Field App (PWA)"] = blueprintsMap["App de Campo (PWA)"];

interface ProjectArchitectureBlueprintProps {
  projectTitle: string;
  projectCategory: string;
  tags: string[];
  lang?: 'pt' | 'en';
}

export default function ProjectArchitectureBlueprint({
  projectTitle,
  projectCategory,
  tags,
  lang = 'pt'
}: ProjectArchitectureBlueprintProps) {
  // Find tailored blueprint or generate an adaptive one based on tags
  const blueprint = blueprintsMap[projectTitle] || {
    projectTitle,
    systemName: `${projectTitle.toUpperCase().replace(/\s+/g, '-')}-CORE`,
    architectureType: `Pipeline de Engenharia & Integração (${projectCategory})`,
    nodes: [
      {
        id: "src",
        step: 1,
        name: lang === 'pt' ? "Origem de Dados & Eventos" : "Data Source & Events",
        category: "source" as const,
        tech: [tags[0] || "REST API", "Entrada de Dados", "Webhooks"],
        protocol: "HTTPS / JSON Payload",
        summary: lang === 'pt' 
          ? "Captura estruturada de informações com validação rigorosa de payloads de entrada."
          : "Structured capture of inputs with strict schema payload validation.",
        engineeringRules: [
          lang === 'pt' ? "Validação tipada de esquemas" : "Typed schema validation",
          lang === 'pt' ? "Sanitização contra injeção e dados inconsistentes" : "Sanitization against malformed data"
        ],
        slaOrLatency: "< 50ms"
      },
      {
        id: "proc",
        step: 2,
        name: lang === 'pt' ? "Engine de Processamento & Regras" : "Processing Engine & Rules",
        category: "processing" as const,
        tech: [tags[1] || "TypeScript / Python", "Automação", "Regras de Negócio"],
        protocol: "Async Pipeline Processing",
        summary: lang === 'pt'
          ? "Execução da lógica central, normalização, cálculos analíticos e tratamento de exceções."
          : "Execution of core domain logic, normalization, analytics, and fault handling.",
        engineeringRules: [
          lang === 'pt' ? "Tratamento idempotente para tolerância a falhas" : "Idempotent execution for fault tolerance",
          lang === 'pt' ? "Logs estruturados para auditoria contínua" : "Structured logging for continuous auditability"
        ],
        slaOrLatency: "Processamento contínuo"
      },
      {
        id: "stor",
        step: 3,
        name: lang === 'pt' ? "Armazenamento & Consistência" : "Storage & Consistency Layer",
        category: "storage" as const,
        tech: [tags[2] || "Database / SQL", "Transações ACID", "Modelagem Otimizada"],
        protocol: "Indexed Query Engine",
        summary: lang === 'pt'
          ? "Persistência em modelo relacional ou columnar com índices focados em velocidade."
          : "Persistence in relational or columnar model optimized for low-latency queries.",
        engineeringRules: [
          lang === 'pt' ? "Isolamento transacional e integridade referencial" : "Transactional isolation & referential integrity",
          lang === 'pt' ? "Segurança de acesso por perfil (RBAC)" : "Role-based access control (RBAC)"
        ],
        slaOrLatency: "Queries < 25ms"
      },
      {
        id: "deliv",
        step: 4,
        name: lang === 'pt' ? "Visualização & Entrega de Valor" : "Visualization & Analytics Delivery",
        category: "output" as const,
        tech: [tags[3] || "Dashboards / UI", "Alertas em Tempo Real", "Insights de Gestão"],
        protocol: "Real-time Metrics / Direct Connect",
        summary: lang === 'pt'
          ? "Disponibilização executiva para apoio à decisão, redução de tempo operacional e controle de SLAs."
          : "Executive visibility for decision making, operational time reduction, and SLA control.",
        engineeringRules: [
          lang === 'pt' ? "Automação total sem necessidade de trabalho braçal" : "100% automated without manual labor",
          lang === 'pt' ? "Feedback visual imediato para gestores" : "Instant visual feedback for management"
        ],
        slaOrLatency: "Alta disponibilidade"
      }
    ]
  };

  const [selectedNodeId, setSelectedNodeId] = useState<string>(blueprint.nodes[1]?.id || blueprint.nodes[0]?.id);
  const activeNode = blueprint.nodes.find(n => n.id === selectedNodeId) || blueprint.nodes[0];

  const getCategoryBadge = (cat: ArchitectureNode['category']) => {
    switch (cat) {
      case 'source':
        return { label: 'INGESTION', color: 'border-sky-500/40 text-sky-400 bg-sky-950/60' };
      case 'processing':
        return { label: 'PROCESSING', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60' };
      case 'storage':
        return { label: 'STORAGE & ACID', color: 'border-violet-500/40 text-violet-300 bg-violet-950/60' };
      case 'output':
        return { label: 'DELIVERY / BI', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60' };
    }
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Blueprint Header */}
      <div className="p-4 rounded-2xl bg-stone-950/80 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <Workflow className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm tracking-wide">
                {blueprint.systemName}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans mt-0.5">
              {blueprint.architectureType}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Nodes */}
      <div className="relative">
        {/* Animated Connector Bar */}
        <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-stone-800 z-0 pointer-events-none">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_8px_#22d3ee]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            style={{ width: '40%' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {blueprint.nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const badge = getCategoryBadge(node.category);

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden backdrop-blur-md ${
                  isSelected 
                    ? 'bg-stone-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] scale-[1.02]' 
                    : 'bg-stone-950/70 border-stone-800/80 hover:border-cyan-500/40 hover:bg-stone-900/60'
                }`}
              >
                {/* Node Status Indicator Top */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">
                  {node.name}
                </h4>

                <p className="text-[11px] text-stone-400 font-sans line-clamp-2 mb-3">
                  {node.summary}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1 mt-auto">
                  {node.tech.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700/60 text-stone-300">
                      {t}
                    </span>
                  ))}
                </div>

                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-sky-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Technical Deep-Dive Inspector */}
      {activeNode && (
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-stone-950/90 border border-cyan-500/30 rounded-2xl p-5 md:p-6 shadow-xl relative"
        >
          {/* Subtle Reticle Top Right */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">
                  {lang === 'pt' ? 'ESPECIFICAÇÃO DE ENGENHARIA' : 'ENGINEERING SPECIFICATION'}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white font-sans">
                  {activeNode.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span className="text-stone-500 mr-1.5">PROTOCOLO:</span>
                <span className="text-cyan-300 font-semibold">{activeNode.protocol}</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span className="text-stone-500 mr-1.5">SLA/TEMPO:</span>
                <span className="text-emerald-400 font-semibold">{activeNode.slaOrLatency}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left: Detailed Summary & Tech Stack (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">
                  {lang === 'pt' ? 'OBJETIVO DO ESTÁGIO' : 'STAGE OBJECTIVE'}
                </span>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {activeNode.summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1.5">
                  {lang === 'pt' ? 'STACK & DEPENDÊNCIAS' : 'STACK & DEPENDENCIES'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNode.tech.map((t, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-stone-900 border border-cyan-500/20 text-cyan-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Engineering Rules & Reliability Safeguards (7 cols) */}
            <div className="md:col-span-7 bg-stone-900/60 border border-stone-800/80 rounded-xl p-4 space-y-3">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                {lang === 'pt' ? 'REGRAS DE ENGENHARIA & CONFIABILIDADE' : 'ENGINEERING RULES & SAFEGUARDS'}
              </span>

              <ul className="space-y-2 text-xs font-sans text-stone-300">
                {activeNode.engineeringRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
