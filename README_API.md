# 🚀 Configuração da API - SaveUpFinances

Este projeto foi configurado com uma estrutura robusta para integração com a API que está rodando no `localhost:7410/docs`.

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API rodando em `localhost:7410`

## ⚙️ Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# API Configuration
VITE_API_URL=http://localhost:7410

# Optional: Feature flags
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true
VITE_ENABLE_PERFORMANCE_MONITORING=false
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Verificar Configuração

Certifique-se de que a API está rodando e acessível em:
- **URL Base**: `http://localhost:7410`
- **Documentação**: `http://localhost:7410/docs`
- **Health Check**: `http://localhost:7410/health` (se disponível)

## 🏗️ Estrutura da API

```
src/
├── lib/
│   ├── api.ts                 # Cliente HTTP centralizado
│   ├── apiServices.ts         # Serviços organizados por domínio
│   └── apiInterceptors.ts     # Sistema de interceptadores
├── constants/
│   └── api.ts                 # Endpoints e configurações
├── config/
│   └── environment.ts         # Configuração por ambiente
├── hooks/
│   └── useApi.ts              # Hook personalizado para API
└── HTTP/                      # Hooks existentes (atualizados)
    ├── auth.ts
    ├── user.ts
    └── account.ts
```

## 🔧 Como Usar

### 1. Serviços da API

```typescript
import { authService, userService, accountService } from '../lib/apiServices';

// Autenticação
const loginResult = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Usuários
const users = await userService.getAll();
const user = await userService.getById('123');

// Contas
const accounts = await accountService.getByUserId('user123');
```

### 2. Com React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { userService } from '../lib/apiServices';

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  const createUser = useMutation({
    mutationFn: userService.create,
  });

  // ... resto do componente
}
```

### 3. Hook Personalizado

```typescript
import { useApi } from '../hooks/useApi';
import { userService } from '../lib/apiServices';

function UserComponent() {
  const { data, loading, error, execute } = useApi();

  const handleFetchUsers = async () => {
    await execute(() => userService.getAll());
  };

  // ... resto do componente
}
```

## 🌐 Endpoints Disponíveis

### Autenticação
- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout

### Usuários
- `GET /users` - Listar usuários
- `GET /users/{id}` - Buscar usuário
- `POST /users` - Criar usuário
- `PUT /users/{id}` - Atualizar usuário
- `DELETE /users/{id}` - Deletar usuário

### Contas
- `GET /account/{userId}` - Contas por usuário
- `GET /account/{id}` - Conta por ID
- `POST /account` - Criar conta
- `PUT /account/{id}` - Atualizar conta
- `DELETE /account/{id}` - Deletar conta

## 🚨 Tratamento de Erros

A estrutura inclui tratamento automático de erros:

```typescript
try {
  const result = await userService.getById('123');
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Token expirado - redirecionar para login
        break;
      case 404:
        // Recurso não encontrado
        break;
      case 500:
        // Erro interno do servidor
        break;
    }
  }
}
```

## 🔄 Interceptadores

### Automáticos
- **Auth**: Adiciona token automaticamente
- **Logging**: Log de todas as requisições/respostas
- **Token Refresh**: Tenta refresh automático em caso de 401

### Customizados
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

## 🧪 Testando a Conexão

### 1. Verificar se a API está rodando

```bash
curl http://localhost:7410/health
# ou
curl http://localhost:7410/docs
```

### 2. Testar endpoint de usuários

```bash
curl http://localhost:7410/users
```

### 3. Verificar no console do navegador

Os interceptadores fazem logging automático de todas as requisições.

## 🐛 Troubleshooting

### Erro de CORS
- Verificar se a API está configurada para aceitar requisições do frontend
- Verificar se a URL está correta no `.env.local`

### Token Expirado
- O sistema tenta refresh automático
- Se falhar, redireciona para login

### Timeout
- Aumentar o timeout no arquivo de configuração
- Verificar se a API está respondendo

### Erro 404
- Verificar se os endpoints estão corretos
- Consultar a documentação em `/docs`

## 📚 Documentação Adicional

- [Guia de Integração](API_INTEGRATION.md) - Documentação completa
- [Swagger/OpenAPI](http://localhost:7410/docs) - Documentação da API
- [React Query Docs](https://tanstack.com/query/latest) - Gerenciamento de estado

## 🔗 Links Úteis

- **API Base**: http://localhost:7410
- **Documentação**: http://localhost:7410/docs
- **Health Check**: http://localhost:7410/health (se disponível)

## 📝 Notas de Desenvolvimento

- A estrutura é escalável e pode ser facilmente estendida
- Todos os endpoints estão centralizados em `constants/api.ts`
- O sistema de interceptadores permite customização avançada
- Os hooks existentes foram atualizados para usar a nova estrutura
- Suporte completo a TypeScript com tipos bem definidos

## 🚀 Próximos Passos

1. **Testar a conexão** com a API
2. **Implementar novos endpoints** conforme necessário
3. **Adicionar validação** com Zod (já configurado)
4. **Configurar testes** para os serviços da API
5. **Implementar cache** com React Query
6. **Adicionar monitoramento** de performance

---

**Status**: ✅ Configurado e Pronto para Uso  
**Versão**: 1.0.0  
**Última Atualização**: Dezembro 2024
