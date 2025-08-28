# API Integration Guide

Este documento explica como usar a nova estrutura de integração com a API que está rodando no `localhost:7410/docs`.

## Estrutura da API

### 1. Cliente HTTP Centralizado (`src/lib/api.ts`)

O `ApiClient` é uma classe singleton que gerencia todas as requisições HTTP com:
- Timeout configurável
- Headers automáticos
- Interceptação de erros
- Gerenciamento de tokens de autenticação

### 2. Serviços da API (`src/lib/apiServices.ts`)

Serviços organizados por domínio:
- `authService`: Autenticação, login, logout, refresh token
- `userService`: Operações CRUD de usuários
- `accountService`: Operações CRUD de contas
- `apiService`: Serviço genérico para endpoints customizados

### 3. Constantes da API (`src/constants/api.ts`)

Endpoints e configurações centralizadas:
- URLs da API
- Códigos de status HTTP
- Mensagens de erro
- Métodos HTTP

### 4. Interceptadores (`src/lib/apiInterceptors.ts`)

Sistema de interceptadores para:
- Adicionar tokens automaticamente
- Logging de requisições/respostas
- Refresh automático de tokens
- Tratamento de erros

### 5. Hook Personalizado (`src/hooks/useApi.ts`)

Hook React para gerenciar estado da API:
- Loading states
- Error handling
- Data management

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
VITE_API_URL=http://localhost:7410
```

### 2. Estrutura de Resposta da API

A API retorna respostas no formato:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

## Uso

### 1. Usando Serviços Diretamente

```typescript
import { authService, userService } from '../lib/apiServices';

// Login
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Buscar usuários
const users = await userService.getAll();
```

### 2. Usando com React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '../lib/apiServices';

// Query
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });
}

// Mutation
function useCreateUser() {
  return useMutation({
    mutationFn: userService.create,
  });
}
```

### 3. Usando o Hook Personalizado

```typescript
import { useApi } from '../hooks/useApi';
import { userService } from '../lib/apiServices';

function UserComponent() {
  const { data, loading, error, execute } = useApi();

  const handleFetchUsers = async () => {
    await execute(() => userService.getAll());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleFetchUsers}>Fetch Users</button>
      {/* Render data */}
    </div>
  );
}
```

### 4. Tratamento de Erros

```typescript
import { ApiError } from '../lib/api';

try {
  const result = await userService.getById('123');
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Redirect to login
        break;
      case 404:
        // Show not found message
        break;
      default:
        // Show generic error
    }
  }
}
```

## Endpoints Disponíveis

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh token
- `POST /auth/register` - Registro
- `POST /auth/forgot-password` - Esqueci a senha
- `POST /auth/reset-password` - Resetar senha

### Usuários
- `GET /users` - Listar usuários
- `GET /users/{id}` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PUT /users/{id}` - Atualizar usuário
- `DELETE /users/{id}` - Deletar usuário
- `GET /users/profile` - Perfil do usuário
- `PUT /users/profile` - Atualizar perfil
- `POST /users/change-password` - Alterar senha

### Contas
- `GET /account/{userId}` - Contas por usuário
- `GET /account/{id}` - Conta por ID
- `POST /account` - Criar conta
- `PUT /account/{id}` - Atualizar conta
- `DELETE /account/{id}` - Deletar conta

### Transações
- `GET /transactions` - Listar transações
- `GET /transactions/{id}` - Transação por ID
- `GET /transactions/account/{accountId}` - Transações por conta
- `GET /transactions/user/{userId}` - Transações por usuário
- `POST /transactions` - Criar transação
- `PUT /transactions/{id}` - Atualizar transação
- `DELETE /transactions/{id}` - Deletar transação

### Categorias
- `GET /categories` - Listar categorias
- `GET /categories/{id}` - Categoria por ID
- `GET /categories/type/{type}` - Categorias por tipo

### Relatórios
- `GET /reports/expense-summary` - Resumo de despesas
- `GET /reports/income-summary` - Resumo de receitas
- `GET /reports/balance-sheet` - Balanço
- `GET /reports/cash-flow` - Fluxo de caixa
- `GET /reports/period/{startDate}/{endDate}` - Relatório por período

### Configurações
- `GET /settings` - Configurações
- `GET /settings/preferences` - Preferências do usuário
- `GET /settings/notifications` - Notificações
- `GET /settings/currency` - Moeda

## Recursos Avançados

### 1. Retry Automático

O cliente API pode ser configurado para tentar novamente em caso de falha:

```typescript
// Configurar no ApiClient
this.config = {
  retryAttempts: 3,
  retryDelay: 1000,
};
```

### 2. Cache de Respostas

Usar React Query para cache automático:

```typescript
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: userService.getAll,
  staleTime: 5 * 60 * 1000, // 5 minutos
  cacheTime: 10 * 60 * 1000, // 10 minutos
});
```

### 3. Interceptadores Customizados

```typescript
import { interceptorManager } from '../lib/apiInterceptors';

interceptorManager.addInterceptor({
  onRequest: (config) => {
    // Adicionar headers customizados
    config.headers = {
      ...config.headers,
      'X-Custom-Header': 'value',
    };
    return config;
  },
});
```

## Troubleshooting

### 1. Erro de CORS

Verificar se a API está configurada para aceitar requisições do frontend.

### 2. Token Expirado

O sistema automaticamente tenta refresh do token em caso de 401.

### 3. Timeout

Aumentar o timeout no `ApiClient` se necessário:

```typescript
this.config.timeout = 30000; // 30 segundos
```

### 4. Debug

Ativar logs detalhados:

```typescript
// Os interceptadores já fazem logging automático
// Verificar console para detalhes das requisições
```

## Exemplos Completos

### Componente de Login

```typescript
import { useAuthCreate } from '../HTTP/auth';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useAuthCreate();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Senha" />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
      </button>
      {loginMutation.error && (
        <div className="error">{loginMutation.error.message}</div>
      )}
    </form>
  );
}
```

### Lista de Usuários

```typescript
import { getUsers } from '../HTTP/user';

function UserList() {
  const { data, isLoading, error } = getUsers();

  if (isLoading) return <div>Carregando usuários...</div>;
  if (error) return <div>Erro ao carregar usuários: {error.message}</div>;

  return (
    <div>
      {data?.data.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

Esta estrutura fornece uma base sólida e escalável para integração com a API, com tratamento de erros robusto, interceptadores configuráveis e hooks React otimizados.
