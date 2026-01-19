# SaveUpFinances – Front-End

Aplicação web para gestão financeira pessoal, construída com React + TypeScript e Vite. Este repositório contém exclusivamente o frontend e integra-se com uma API externa configurável via variáveis de ambiente.

## Funcionalidades

- Autenticação e cadastro de usuários
- Gerenciamento de contas bancárias e cartões de crédito
- Registro de transações (receitas, despesas, investimentos)
- Categorias personalizáveis e orçamentos por categoria
- Resumos mensais/anuais, relatórios e dashboards interativos
- Interface responsiva com tema claro/escuro

## Tecnologias

- React 19, React Router
- TypeScript, Vite 7
- Tailwind CSS 4
- Radix UI + componentes (shadcn)
- TanStack React Query
- React Hook Form + Zod
- Chart.js + react-chartjs-2
- Axios, Day.js, Lucide Icons
- Biome (lint/format)
- Orval (geração de cliente da API)

Veja as dependências em [package.json](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/package.json).

## Estrutura

```
src/
├── components/         # UI reutilizável e layouts
├── pages/              # Páginas por domínio (Accounts, Budget, etc.)
├── lib/                # Cliente HTTP, serviços, interceptadores
├── hooks/              # Hooks (auth, API)
├── constants/          # Constantes (endpoints, cores, categorias)
├── config/             # Configuração por ambiente
├── schema/             # Schemas de validação (Zod)
├── types/              # Definições de tipos
├── App.tsx, main.tsx   # Bootstrap da aplicação
└── index.css           # Estilos base (Tailwind)
```

Arquivos úteis:
- [vite.config.ts](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/vite.config.ts)
- [tsconfig.json](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/tsconfig.json)
- [env.example](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/env.example)
- [src/env.ts](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/src/env.ts)
- [src/config/environment.ts](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/src/config/environment.ts)

## Ambiente

1. Copie o arquivo de exemplo:
   ```bash
   cp env.example .env.local
   ```
2. Defina a URL da API:
   ```
   VITE_API_URL=http://localhost:7410
   ```
   Flags opcionais:
   - `VITE_ENABLE_ANALYTICS=true|false`
   - `VITE_DEBUG_MODE=true|false`
   - `VITE_ENABLE_PERFORMANCE_MONITORING=true|false`

3. Instale dependências:
   ```bash
   npm install
   ```

4. Execute em desenvolvimento:
   ```bash
   npm run dev
   ```

Detalhes de integração com a API: veja [README_API.md](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/README_API.md).

## Scripts

- `npm run dev` — inicia o Vite em desenvolvimento
- `npm run build` — build de produção (TypeScript + Vite)
- `npm run preview` — serve a build localmente
- `npm run lint` — verificação com Biome
- `npm run lint:fix` — correções automáticas com Biome
- `npm run generate:api` — gera o cliente da API via Orval

## Padrões de Código

- Lint/format com Biome (configuração em [biome.json](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/biome.json))
- Alias de importação `@/*` configurado em [tsconfig.json](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/tsconfig.json) e [vite.config.ts](file:///c:/Users/INFORMATICA/Desktop/Doc/SaveUpFinances/SaveUpFinances-Front-End/vite.config.ts)

## Licença

Projeto open-source sob licença MIT.

---

Feito com 💸 por Justino Mabui
