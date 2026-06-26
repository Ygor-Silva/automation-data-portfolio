# 🌌 Ygor Teixeira — Portfolio Executivo & Hub de Engenharia

[![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ygor-teixeira-portfolio.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Este repositório abriga o código-fonte oficial do meu **Portfólio Profissional Executivo**, acessível em [ygor-teixeira-portfolio.vercel.app](https://ygor-teixeira-portfolio.vercel.app/). Desenvolvido sob os mais elevados padrões de engenharia de software full-stack, design de experiência (UX/UI) e segurança, o site funciona como um Hub interativo que materializa minhas competências técnicas e trajetória de alto impacto em automação, inteligência de dados e desenvolvimento de sistemas.

---

## 💎 Visão Geral do Site & Filosofia de Desenvolvimento

O portfólio não é apenas um cartão de visitas, mas sim uma aplicação de alta fidelidade que exemplifica a convergência entre **design conceitual (cyberpunk minimalista)** e **robustez industrial**. Todo o projeto foi planejado para oferecer uma experiência fluida, reativa e ultraveloz para recrutadores, parceiros e clientes de consultoria.

### 🌟 Diferenciais de Engenharia Aplicados:
* **Mentalidade Industrial (Kaizen & Mercedes-Benz Background):** Layouts limpos de alta densidade sem poluição visual desnecessária. Foco absoluto na eliminação de redundâncias de renderização e otimização de performance.
* **Estética Cyberpunk Minimalista:** Base profunda em cinza-escuro e preto (`#050505`), com contrastes sutis em ciano neon e violeta para criar guias visuais e hierarquia de leitura impecável.
* **Segurança de Ponta (Hardening):** Zero exposição de chaves de API sensíveis no lado do cliente (Client-Side), garantindo total conformidade com boas práticas de segurança corporativa.

---

## 🚀 Principais Funcionalidades do Portfólio

O site é dividido em módulos de alta interatividade, integrando perfeitamente animações suaves e renderização performática:

### 1. Sistema de Internacionalização Instantâneo (Bilingue: PT/EN)
* **Reatividade em Tempo Real:** Toda a interface do usuário (descrições, experiências profissionais, assistente e categorias) é alternada instantaneamente através de gerenciamento de estado unificado.
* **Toast Micro-interativo de Confirmação:** Ao alterar o idioma, um componente flutuante elegante construído com `AnimatePresence` surge no topo da tela, fornecendo feedback tátil e visual ao usuário de forma polida.

### 2. Catálogo de Projetos com Filtro Dinâmico
* **Exibição Categorizada:** Os projetos (como o assistente financeiro cyberpunk **Kerdos**, o calculador de comissões **DivCom**, dashboards integrados de BI e automações complexas) são listados com tags interativas.
* **Filtragem Reativa:** Sistema de filtragem reativo rápido que re-organiza os elementos na tela sem recarregamento ou oscilações de layout.

### 3. Assistente de IA Integrado (FloatingChat)
* **Atendimento Contextual Inteligente:** Um assistente virtual flutuante capaz de responder a dúvidas dos visitantes sobre minhas tecnologias, formação, maiores conquistas e canais de contato.
* **Segurança Server-Side:** Integração com a API do Gemini realizada exclusivamente no back-end (Next.js API Routes), utilizando a moderna SDK `@google/genai` e mantendo a chave secreta protegida sob variáveis de ambiente no servidor.
* **Consistência de Idioma:** O assistente detecta e altera seu idioma de boas-vindas e respostas dinamicamente em sincronia direta com a linguagem selecionada no site.

### 4. Background Interativo Gerado por GPU
* **Interactive Background:** Um background interativo moderno composto por grades sutis e partículas reativas que respondem ao movimento do cursor do mouse, adicionando imersão sem comprometer o processamento da CPU.

---

## 🛠️ Stack Tecnológica de Alta Performance

* **Next.js 15.5+ (App Router):** Escolhido pela arquitetura híbrida de alto desempenho que combina renderização rápida no servidor e reatividade no cliente.
* **React 19:** Utilização plena de hooks nativos, controle preciso de efeitos colaterais (`useEffect`) e otimização de estados complexos de interface.
* **Tailwind CSS v4.0:** Utilização do novo motor de compilação CSS ultrarrápido do Tailwind para estilização utilitária de alta coesão.
* **Motion (Framer Motion):** Animações fluidas de entrada, estados de hover e transições físicas controladas matematicamente.
* **TypeScript:** Tipagem estática rigorosa de ponta a ponta para mitigar erros em tempo de execução e garantir excelente manutenibilidade.

---

## 📂 Arquitetura do Repositório

```
├── app/                        # Diretório principal de roteamento e views (Next.js App Router)
│   ├── api/                    # Rotas de API dedicadas para operações server-side
│   │   └── chat/               # Endpoint seguro de comunicação com a API do Gemini
│   ├── globals.css             # Importação otimizada do motor Tailwind v4.0 e resets globais
│   ├── layout.tsx              # Componente de Layout raiz, otimização de fontes (Inter, Space Grotesk) e metadados
│   └── page.tsx                # Estrutura unificada, dados bilingues e controle principal do portfólio
├── components/                 # Componentes encapsulados de interface
│   ├── InteractiveBackground   # Efeito visual de fundo imersivo
│   ├── FloatingChat            # Interface de chat flutuante com IA
│   └── ScrollToTop             # Controle de rolagem suave e retorno ao topo
├── hooks/                      # Hooks customizados para reutilização de lógica de UI
├── lib/                        # Utilitários globais e configurações de sistema
└── public/                     # Assets estáticos, logos oficiais e capturas de tela otimizadas
```

---

## ⚙️ Configuração, Instalação e Execução Local

Siga as etapas abaixo para clonar e rodar o projeto em sua máquina local:

### 1. Requisitos Prévios
* **Node.js** v18.0.0 ou superior.
* **NPM** ou gerenciador de pacotes equivalente.

### 2. Clonar o Repositório
```bash
git clone https://github.com/Ygor-Silva/Ygor-Silva.git
cd Ygor-Silva
```

### 3. Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto contendo sua chave secreta da API do Gemini (necessária para o funcionamento do chat inteligente):
```env
GEMINI_API_KEY=seu_token_aqui
```

### 4. Instalar Dependências
```bash
npm install
```

### 5. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### 6. Compilar para Produção (Build)
```bash
npm run build
npm start
```

---

<div align="center">
  <p>Projetado e codificado com máxima precisão por <strong>Ygor Teixeira</strong></p>
  <p><em>"Unindo inteligência artificial, automação rigorosa e design de alta fidelidade."</em></p>
</div>
