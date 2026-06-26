# 🌌 Portfolio Executivo & Hub de Engenharia — Ygor Teixeira

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini_API-3.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

Este repositório contém o código-fonte do meu portfólio profissional e hub de engenharia. O projeto foi arquitetado sob os mais rigorosos padrões de desenvolvimento full-stack, segurança de dados e design responsivo ultrafluido, servindo como uma demonstração prática das minhas competências em **Automação RPA, Inteligência de Dados e Desenvolvimento de Software**.

---

## 🚀 Filosofia de Engenharia & Mindset Industrial

Vindo de uma base sólida de **5 anos na Mercedes-Benz (Inspeção de Qualidade e Processos)**, toda a arquitetura deste projeto foi projetada sob a ótica do **Método Kaizen**:
* **Eliminação de Desperdício (Muda):** Zero overhead de bibliotecas desnecessárias. O CSS é compilado através do novo motor de alto desempenho do Tailwind CSS v4.0.
* **Garantia de Qualidade (Jidoka):** Tratamento de exceções resiliente em todas as camadas de integrações de API.
* **Visão Sistêmica:** Integração perfeita entre componentes interativos do cliente (Client Components) e lógica robusta isolada no servidor (Server API Routes).

---

## 🏗️ Arquitetura do Sistema

O projeto utiliza o framework **Next.js 15+ (App Router)** rodando em ambiente Node.js de última geração com suporte nativo a TypeScript.

```
├── app/                      # Fluxo principal de roteamento e views (App Router)
│   ├── api/                  # Camada de back-end / rotas restritas de API
│   │   └── chat/             # Proxy seguro para processamento com Gemini AI (Server-Side Only)
│   ├── globals.css           # Variáveis globais e importações otimizadas do Tailwind CSS v4.0
│   ├── layout.tsx            # Estrutura base de Layout e injeção de fontes otimizadas
│   └── page.tsx              # View principal compilada com otimizações de SEO e renderização
├── components/               # Componentes modulares reutilizáveis e isolados
│   ├── InteractiveBackground # Renderização de fundo interativa sob GPU
│   ├── FloatingChat          # Assistente Virtual integrado com streaming de dados
│   └── ScrollToTop           # Controle de navegação de rolagem suavizada
├── lib/                      # Utilitários de sistema e helpers de integração
└── public/                   # Assets estáticos, previews de dashboards e logos vetorizados
```

---

## 💎 Destaques do Projeto & Funcionalidades Premium

### 1. Sistema de Internacionalização Fluido (PT / EN)
* **Transição Instantânea de Estado:** Alternância de idioma instantânea controlada via estado reativo com `React.useMemo` para garantir recálculos de renderização em $O(1)$.
* **Toast Micro-interativo:** Um componente de feedback visual elegante (`AnimatePresence` do Motion) que confirma a alteração de idioma em tempo real de forma sutil e não intrusiva.

### 2. Kerdos — Assistente Financeiro Cyberpunk 🟢 (Destaque Especial)
* **O que é:** Interface imersiva e responsiva de um assistente especializado de gestão financeira pessoal e inteligência de saldos.
* **Stack Visual:** Design estético retro-futurista de alta densidade de dados projetado para maximizar a legibilidade de KPIs.
* **Otimização:** Filtros em tempo real por categoria de projetos ("Todos", "Dashboards", "Automação", "Sistemas") integrados harmoniosamente.

### 3. Assistente de IA Integrado (FloatingChat)
* **Processamento no Servidor:** As requisições de conversação são proxyadas de forma segura através de `/app/api/chat/route.ts` utilizando a SDK oficial `@google/genai`.
* **Zero Exposição de Chaves:** O token do Gemini API permanece 100% oculto do lado do cliente (Client-Side), prevenindo ataques de vazamento de credenciais (Credential Exposure).
* **Adaptabilidade Cultural:** O chat se adapta dinamicamente ao idioma escolhido pelo usuário no portfólio (PT-BR ou EN-US) instantaneamente.

### 4. Responsividade Mobile Sob Medida (UX/UI Premium)
* **Mobile-First Real:** Interfaces otimizadas para toque com área mínima de clique de 44px de acordo com as diretrizes do iOS/Android Human Interface Guidelines.
* **Fluid Grid Systems:** Grids adaptativos que evitam quebras visuais e overflow horizontal, fornecendo transições elegantes entre mobile, tablets, telas retina e desktops ultra-wide.

---

## 🛡️ Protocolo de Segurança & Hardening

Como Especialista em Segurança da Informação, este portfólio implementa defesas ativas contra os principais vetores de ataque web:

* **Isolamento de API:** Comunicação restrita entre o cliente e provedores de IA. Toda e qualquer inferência passa obrigatoriamente por API Routes server-side.
* **Proteção de Variáveis de Ambiente:** Nenhuma chave privada é exposta ao cliente web (sem prefixo `NEXT_PUBLIC_` para dados sensíveis).
* **Sanitização contra XSS:** Renderização de mensagens de chat estruturada para impedir injeção arbitrária de scripts no DOM através do tratamento rigoroso de texto reativo.
* **Tratamento de Concorrência e Rendimento:** Cache inteligente de dados estáticos de projetos no lado do servidor para mitigar gargalos e prevenir tentativas de negação de serviço (DoS) por excesso de requisições.

---

## 🎨 Design System & Tipografia

A identidade visual foi desenhada com alto contraste e foco no conforto óptico durante sessões prolongadas de leitura:

* **Dark Theme Profundo:** Base sólida com tom `#050505`, acentuada com tons vibrantes de ciano (`text-cyan-400`) e violeta (`text-violet-500`) para guiar a atenção do usuário de forma intuitiva.
* **Tipografia Otimizada via Google Fonts (`next/font`):**
  * **Inter:** Responsável pela legibilidade máxima de textos e parágrafos do corpo da página.
  * **Space Grotesk:** Utilizada em títulos de displays e seções para evocar uma assinatura de alta tecnologia e precisão.
  * **JetBrains Mono:** Utilizada para métricas, metadados de projetos e código, reforçando o rigor técnico.

---

## 💻 Instruções para Instalação e Execução Local

### Pré-requisitos
* Node.js v18.0 ou superior instalado.
* NPM v10.0 ou superior.

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/Ygor-Silva/Ygor-Silva.git
cd Ygor-Silva
```

### Passo 2: Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com base no modelo `.env.example`:
```env
# Chave de API da Google Gemini (Obrigatório apenas para o assistente de IA)
GEMINI_API_KEY=sua_chave_aqui
```

### Passo 3: Instalar as Dependências
```bash
npm install
```

### Passo 4: Executar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse o endereço local: `http://localhost:3000`

### Passo 5: Compilar para Produção (Build de Alta Performance)
Para gerar uma build estática extremamente otimizada:
```bash
npm run build
npm start
```

---

## 🛠️ Tecnologias Utilizadas no Core do Sistema

* **Next.js 15.4+** — Renderização de alta velocidade com suporte a Server Components.
* **React 19** — Gerenciamento declarativo do DOM e renderização de estado ultrarrápida.
* **Tailwind CSS v4.0** — Motor utilitário para estilização performática de baixo custo.
* **Motion** — Transições físicas fluidas e controle de estados reativos de animação.
* **@google/genai** — SDK nativa da Google para inferência inteligente.

---

<div align="center">
  <p>Desenvolvido com precisão milimétrica por <strong>Ygor Teixeira</strong></p>
  <p><em>"A qualidade deve ser construída no processo, não apenas inspecionada."</em></p>
</div>
