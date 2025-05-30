# Finance Control

Aplicação web para controle financeiro pessoal, desenvolvida com React, TypeScript, Vite e Prisma.

## Funcionalidades

- Cadastro e autenticação de usuários
- Gerenciamento de contas bancárias, cartões de crédito e fontes de renda
- Registro de transações (receitas, despesas, investimentos)
- Categorias personalizáveis para transações
- Resumo financeiro mensal e anual
- Relatórios e dashboards interativos
- Orçamentos por categoria
- Interface responsiva e tema escuro/claro

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## Estrutura do Projeto

```
├── prisma/              # Schema e seed do banco de dados
├── public/              # Arquivos estáticos
├── src/                 # Código-fonte da aplicação
│   ├── app/             # Organização por domínio
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas principais
│   ├── services/        # Serviços de API
│   └── utils/           # Utilitários
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
└── README.md
```

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone <url-do-repo>
   cd <nome-do-projeto>
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o banco de dados:**
   - Crie um banco PostgreSQL e defina a variável `DATABASE_URL` no arquivo `.env`.

4. **Rode as migrations e o seed:**
   ```sh
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento Vite
- `npm run build` — Gera a build de produção
- `npm run lint` — Executa o linter
- `npm run preview` — Visualiza a build de produção localmente

## Configuração do ESLint

O projeto já vem com ESLint configurado para React e TypeScript. Veja exemplos de expansão da configuração no próprio [README.md](README.md).

## Licença

Este projeto é open-source e está sob a licença MIT.

---

> Feito com 💸 por Justino Mabui