# Guia de Cores - SaveUp Finances

## Paleta de Cores Harmoniosa

Este projeto utiliza uma paleta de cores cuidadosamente selecionada para criar uma experiência visual harmoniosa e profissional, baseada em verde, amarelo, azul, preto e branco.

## Cores Principais

### 🟢 Verde (Success, Prosperidade)
- **50**: `#f0fdf4` - Verde muito claro para fundos
- **100**: `#dcfce7` - Verde claro para hover states
- **200**: `#bbf7d0` - Verde claro para bordas
- **300**: `#86efac` - Verde médio para elementos secundários
- **400**: `#4ade80` - Verde médio para destaque
- **500**: `#22c55e` - Verde principal para ações
- **600**: `#16a34a` - Verde escuro para texto importante
- **700**: `#15803d` - Verde escuro para fundos
- **800**: `#166534` - Verde muito escuro
- **900**: `#14532d` - Verde mais escuro para contrastes

### 🟡 Amarelo (Atenção, Otimismo)
- **50**: `#fefce8` - Amarelo muito claro para fundos
- **100**: `#fef3c7` - Amarelo claro para hover states
- **200**: `#fde68a` - Amarelo claro para bordas
- **300**: `#fcd34d` - Amarelo médio para elementos secundários
- **400**: `#fbbf24` - Amarelo médio para destaque
- **500**: `#f59e0b` - Amarelo principal para alertas
- **600**: `#d97706` - Amarelo escuro para texto importante
- **700**: `#b45309` - Amarelo escuro para fundos
- **800**: `#92400e` - Amarelo muito escuro
- **900**: `#78350f` - Amarelo mais escuro para contrastes

### 🔵 Azul (Informação, Confiança)
- **50**: `#eff6ff` - Azul muito claro para fundos
- **100**: `#dbeafe` - Azul claro para hover states
- **200**: `#bfdbfe` - Azul claro para bordas
- **300**: `#93c5fd` - Azul médio para elementos secundários
- **400**: `#60a5fa` - Azul médio para destaque
- **500**: `#3b82f6` - Azul principal para links
- **600**: `#2563eb` - Azul escuro para texto importante
- **700**: `#1d4ed8` - Azul escuro para fundos
- **800**: `#1e40af` - Azul muito escuro
- **900**: `#1e3a8a` - Azul mais escuro para contrastes

### ⚫ Preto (Neutro, Profissionalismo)
- **50**: `#f8fafc` - Cinza muito claro para fundos
- **100**: `#f1f5f9` - Cinza claro para hover states
- **200**: `#e2e8f0` - Cinza claro para bordas
- **300**: `#cbd5e1` - Cinza médio para elementos secundários
- **400**: `#94a3b8` - Cinza médio para destaque
- **500**: `#64748b` - Cinza principal para texto secundário
- **600**: `#475569` - Cinza escuro para texto importante
- **700**: `#334155` - Cinza escuro para fundos
- **800**: `#1e293b` - Cinza muito escuro
- **900**: `#0f172a` - Cinza mais escuro para contrastes

### ⚪ Branco
- **Branco**: `#ffffff` - Fundo principal e texto sobre cores escuras

## Cores Semânticas

### ✅ Success
- **Cor**: `#16a34a` (green-600)
- **Uso**: Indicadores positivos, confirmações, metas atingidas

### ⚠️ Warning
- **Cor**: `#f59e0b` (yellow-500)
- **Uso**: Alertas, avisos, atenção necessária

### ℹ️ Info
- **Cor**: `#3b82f6` (blue-500)
- **Uso**: Links, informações, navegação

### ❌ Error
- **Cor**: `#dc2626` (vermelho padrão)
- **Uso**: Erros, falhas, ações destrutivas

### 😐 Neutral
- **Cor**: `#64748b` (black-500)
- **Uso**: Texto secundário, elementos neutros

## Como Usar

### 1. Importar as Cores
```typescript
import { COLORS } from '../constants/colors';

// Usar uma cor específica
const backgroundColor = COLORS.green[100];
const textColor = COLORS.blue[600];
```

### 2. Aplicar no CSS
```typescript
// Usar inline styles
<div style={{ backgroundColor: COLORS.green[500] }}>

// Usar com Tailwind (se configurado)
<div className="bg-green-500">
```

### 3. Exemplos de Uso
```typescript
// Botão de sucesso
<button style={{ backgroundColor: COLORS.green[600] }}>

// Alerta de aviso
<div style={{ backgroundColor: COLORS.yellow[100], borderColor: COLORS.yellow[500] }}>

// Link de informação
<a style={{ color: COLORS.blue[600] }}>
```

## Princípios de Design

### 1. Harmonia Visual
- As cores foram selecionadas para criar uma experiência visual coesa
- Cada cor tem múltiplas tonalidades para diferentes contextos
- O contraste entre cores garante legibilidade

### 2. Acessibilidade
- Todas as combinações de cores atendem aos padrões de contraste WCAG
- Cores semânticas são consistentes em todo o sistema
- Suporte para modo escuro (quando implementado)

### 3. Consistência
- Uso padronizado de cores para elementos similares
- Hierarquia visual clara através das tonalidades
- Transições suaves entre estados (hover, focus, etc.)

## Componentes que Utilizam Esta Paleta

- **QuickStats**: Estatísticas rápidas com cores por categoria
- **ExpenseChart**: Gráfico de despesas com cores harmoniosas
- **FinancialGoals**: Metas financeiras com indicadores visuais
- **RecentTransactions**: Lista de transações com categorização por cor
- **FinancialAlerts**: Alertas com cores por tipo e prioridade
- **MonthlySummary**: Resumo mensal com evolução visual
- **FinancesResume**: Cards de resumo com cores temáticas

## Manutenção

Para manter a consistência visual:
1. Sempre use as cores definidas em `COLORS` ao invés de valores hardcoded
2. Teste o contraste entre cores antes de implementar
3. Mantenha a semântica das cores (verde para sucesso, amarelo para aviso, etc.)
4. Documente novas combinações de cores no sistema
