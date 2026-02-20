# ⚡ Hermes: AI-Driven Project Analytics

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white)
![Apache ECharts](https://img.shields.io/badge/Apache_ECharts-AA344D?style=for-the-badge&logo=apache-echarts&logoColor=white)

**Hermes** é uma plataforma inteligente de análise de dados para o Redmine. Utilizando IA generativa, o sistema transforma consultas complexas em visualizações interativas e relatórios executivos detalhados.

---
# 🛠️ Stack Tecnológica
Frontend
Core: React 18, TypeScript, Vite.

Estilização: Tailwind CSS v4.

Gráficos: Apache ECharts (echarts-for-react).

Exportação: jsPDF para relatórios estruturados.

Comunicação: Axios.

Backend (Hermes API)
Engine: Java 21 + Spring Boot 3.5.

IA: Spring AI + Model Context Protocol (MCP).

Banco de Dados: PostgreSQL com suporte a Vetores (pgvector).

---
# 🚀 Como Executar
Clone o repositório:

git clone
```
https://github.com/SamuelRaymundo/hermes-frontend.git
```
Instale as dependências:
```
npm install
```
Inicie o servidor de desenvolvimento:
```
npm run dev
```
O frontend estará disponível em:
```
http://localhost:5173.
```
---
## 📂 Estrutura Arquitetural
```bash
src/
├── components/          # Componentes Visuais (UI)
│   ├── ChatInterface.tsx   # Orquestrador principal de Layout
│   ├── FilterBar.tsx       # Controle de filtros (Projeto/Categoria)
│   ├── ChatList.tsx        # Container de mensagens com auto-scroll
│   ├── ChatInput.tsx       # Input inteligente e toggles de modo
│   ├── ChatMessage.tsx     # Renderização de balões (Markdown support)
│   ├── ChartViewer.tsx     # Visualizador de ECharts tipado
│   └── Header.tsx          # Identidade visual e Toggle de Tema
├── hooks/               # Lógica de Negócio e Estado
│   └── useChat.ts          # Gerenciamento de conversas e chamadas API
├── utils/               # Utilitários e Helpers
│   ├── chartTheme.ts       # Configurações de cores dinâmicas (Dark/Light)
│   ├── exportUtils.ts      # Lógica de exportação para PDF e PNG
│   └── jsonUtils.ts        # Tratamento de dados da IA
├── App.tsx              # Ponto de entrada da aplicação
└── main.tsx             # Inicialização do React 


