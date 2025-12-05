# Documentação da Integração Frontend-Backend

## Visão Geral

Este documento descreve o processo de integração entre o frontend e o backend do projeto SaveUpFinances, detalhando a estrutura de comunicação, os serviços implementados e o fluxo de autenticação.

## Estrutura da Integração

### Cliente HTTP (ApiClient)

O sistema utiliza uma classe `ApiClient` centralizada para gerenciar todas as requisições HTTP:

- Localização: `src/lib/api.ts`
- Funcionalidades:
  - Configuração de base URL, timeout e headers padrão
  - Gerenciamento automático de tokens de autenticação
  - Tratamento de erros e respostas
  - Mecanismo de refresh token para sessões expiradas

### Endpoints da API

Os endpoints da API estão definidos em constantes para facilitar a manutenção:

- Localização: `src/constants/api.ts`
- Categorias de endpoints:
  - Autenticação (login, registro, refresh token)
  - Usuários
  - Contas
  - Saldos de contas
  - Fontes de renda
  - Cartões de crédito
  - Dívidas
  - Pagamentos de dívidas
  - Orçamentos
  - Bancos

### Serviços de API

Foram implementados serviços específicos para cada área funcional do sistema:

- Localização: `src/lib/apiServices.ts`
- Serviços implementados:
  - `authService`: Gerencia autenticação, login, logout e refresh token
  - `userService`: Operações relacionadas a usuários
  - `accountService`: Gerenciamento de contas
  - `accountBalanceService`: Controle de saldos
  - `accountSourceService`: Gerenciamento de fontes de renda
  - `creditCardService`: Operações com cartões de crédito
  - `debtsService`: Gerenciamento de dívidas
  - `debtPaymentsService`: Controle de pagamentos de dívidas
  - `budgetService`: Gerenciamento de orçamentos
  - `bankService`: Operações relacionadas a bancos

## Autenticação

### Fluxo de Autenticação

1. **Login**: O usuário fornece credenciais que são validadas pelo backend
2. **Armazenamento de Tokens**: Após login bem-sucedido, tokens JWT são armazenados no localStorage
3. **Autorização**: Todas as requisições subsequentes incluem o token no header Authorization
4. **Refresh Token**: Quando o token expira (erro 401), o sistema tenta renovar automaticamente usando o refresh token
5. **Logout**: Remove tokens do localStorage e notifica o backend

### Componentes de Autenticação

- **Hook useAuth** (`src/hooks/useAuth.ts`): Gerencia o estado de autenticação e fornece funções para login, logout e verificação de autenticação
- **AuthProvider** (`src/components/AuthProvider.tsx`): Componente de contexto que disponibiliza o estado de autenticação para toda a aplicação
- **ProtectedRoute** (`src/components/ProtectedRoute.tsx`): Componente que protege rotas, redirecionando usuários não autenticados

## Estrutura de Tipos

O projeto utiliza TypeScript com tipos definidos para todas as entidades:

- Localização: `src/HTTP/Type/`
- Tipos implementados:
  - `authType.ts`: Tipos para autenticação
  - `account.type.ts`: Tipos para contas
  - Outros tipos específicos para cada entidade do sistema

## Configuração da Aplicação

A aplicação está configurada com:

- **React Router**: Para gerenciamento de rotas
- **React Query**: Para gerenciamento de estado e cache de dados
- **Axios**: Como cliente HTTP para comunicação com a API

## Testes

A integração foi testada verificando:

1. Fluxo de autenticação (login, proteção de rotas, logout)
2. Comunicação com endpoints da API
3. Tratamento de erros e refresh de token

## Próximos Passos

Para melhorar a integração, considere:

1. Implementar testes automatizados para os serviços de API
2. Adicionar interceptors para logging e monitoramento
3. Implementar cache mais sofisticado para dados frequentemente acessados
4. Melhorar o feedback visual durante operações assíncronas