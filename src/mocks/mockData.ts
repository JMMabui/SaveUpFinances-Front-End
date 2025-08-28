import type { Debt } from "../types/Debt"


export enum AccountType {
  CORRENTE = 'CORRENTE',
  POUPANCA = 'POUPANCA',
  SALARIO = 'SALARIO',
  CARTEIRA_MOVEL = 'CARTEIRA_MOVEL',
  CONJUNTA = 'CONJUNTA',
  INVESTIMENTO = 'INVESTIMENTO'
}

export enum TransactionType {
  RECEITA = 'RECEITA',
  DESPESA = 'DESPESA',
  INVESTIMENTO = 'INVESTIMENTO'
}

export const mockUser = {
  id: '1',
  name: 'Carlos Manjate',
  email: 'carlos.manjate@email.com',
  contact: '841234567',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const mockBanks = [
  {
    id: 1,
    bankName: 'Millennium BIM',
    logoUrl: 'https://example.com/millennium.png',
  },
  {
    id: 2,
    bankName: 'BCI',
    logoUrl: 'https://example.com/bci.png',
  },
  {
    id: 3,
    bankName: 'Standard Bank',
    logoUrl: 'https://example.com/standard.png',
  },
]

export const mockAccounts = [
  {
    id: 1,
    accountName: 'Conta Principal',
    accountType: AccountType.CORRENTE,
    accountHoldeName: 'Carlos Manjate',
    balance: 25000.00,
    userId: mockUser.id,
    bankId: mockBanks[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    accountName: 'Poupança',
    accountType: AccountType.POUPANCA,
    accountHoldeName: 'Carlos Manjate',
    balance: 50000.00,
    userId: mockUser.id,
    bankId: mockBanks[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockCategories = [
  {
    id: 1,
    categoryName: 'Salário',
    categoryType: TransactionType.RECEITA,
    icon: '💰',
    color: '#4CAF50',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryName: 'Alimentação',
    categoryType: TransactionType.DESPESA,
    icon: '🍔',
    color: '#FF5722',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    categoryName: 'Transporte',
    categoryType: TransactionType.DESPESA,
    icon: '🚌',
    color: '#FFC107',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    categoryName: 'Chapas',
    categoryType: TransactionType.DESPESA,
    icon: '🚐',
    color: '#9C27B0',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    categoryName: 'Investimentos',
    categoryType: TransactionType.INVESTIMENTO,
    icon: '📈',
    color: '#2196F3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    categoryName: 'Remessas',
    categoryType: TransactionType.RECEITA,
    icon: '💸',
    color: '#00BCD4',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockIncomeSources = [
  {
    id: 1,
    name: 'Salário Empresa Local',
    userId: mockUser.id,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Freelance',
    userId: mockUser.id,
    createdAt: new Date(),
  },
]

export const mockCreditCards = [
  {
    id: 1,
    name: 'Millennium BIM',
    limit: 15000.00,
    dueDay: 15,
    userId: mockUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockTransactions = [
  {
    id: 1,
    description: 'Salário',
    amount: 15000.00,
    type: TransactionType.RECEITA,
    date: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    userId: mockUser.id,
    accountId: mockAccounts[0].id,
    categoryId: mockCategories[0].id,
    incomeSourceId: mockIncomeSources[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    description: 'Supermercado Shoprite',
    amount: 2500.00,
    type: TransactionType.DESPESA,
    date: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    userId: mockUser.id,
    accountId: mockAccounts[0].id,
    categoryId: mockCategories[1].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    description: 'Chapas Semanal',
    amount: 500.00,
    type: TransactionType.DESPESA,
    date: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    userId: mockUser.id,
    accountId: mockAccounts[0].id,
    categoryId: mockCategories[3].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockBudgets = [
  {
    id: 1,
    userId: mockUser.id,
    categoryId: mockCategories[1].id,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    limit: 5000.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: mockUser.id,
    categoryId: mockCategories[3].id,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    limit: 2000.00,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockCreditCardExpenses = [
  {
    id: 1,
    description: 'Compras Game',
    amount: 1500.00,
    date: new Date(),
    categoryId: mockCategories[1].id,
    creditCardId: mockCreditCards[0].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const mockTransactionNotes = [
  {
    id: 1,
    content: 'Pagamento do salário do mês - Empresa Local',
    transactionId: mockTransactions[0].id,
    createdAt: new Date(),
  },
]

export const mockDebts: Debt[] = [
  {
    id: '1',
    descricao: 'Empréstimo Banco',
    valor: 1500,
    credor: 'Banco XYZ',
    dataVencimento: '2024-07-10',
    status: 'pendente',
    observacoes: 'Parcelado em 3x',
  },
  {
    id: '2',
    descricao: 'Cartão de Crédito',
    valor: 800,
    credor: 'Mastercard',
    dataVencimento: '2024-07-05',
    status: 'paga',
    dataPagamento: '2024-07-01',
  },
  {
    id: '3',
    descricao: 'Empréstimo Pessoal',
    valor: 500,
    credor: 'João Silva',
    dataVencimento: '2024-08-01',
    status: 'pendente',
  },
  {
    id: '4',
    descricao: 'Financiamento Carro',
    valor: 2000,
    credor: 'Banco ABC',
    dataVencimento: '2024-09-15',
    status: 'pendente',
    observacoes: 'Restam 2 parcelas',
  },
  {
    id: '5',
    descricao: 'Empréstimo Familiar',
    valor: 300,
    credor: 'Maria Oliveira',
    dataVencimento: '2024-07-20',
    status: 'paga',
    dataPagamento: '2024-07-18',
  },
];

// Funções auxiliares para gerar dados mock adicionais
export const generateMockTransactions = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: mockTransactions.length + index + 1,
    description: `Transação ${index + 1}`,
    amount: Math.random() * 5000,
    type: Math.random() > 0.5 ? TransactionType.RECEITA : TransactionType.DESPESA,
    date: new Date(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    userId: mockUser.id,
    accountId: mockAccounts[0].id,
    categoryId: mockCategories[Math.floor(Math.random() * mockCategories.length)].id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}

// Função para calcular o saldo total das contas
export const calculateTotalBalance = () => {
  return mockAccounts.reduce((total, account) => total + Number(account.balance), 0)
}

// Função para calcular o total de receitas e despesas
export const calculateMonthlyTotals = () => {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  return mockTransactions.reduce(
    (totals, transaction) => {
      if (
        transaction.month === currentMonth &&
        transaction.year === currentYear
      ) {
        if (transaction.type === TransactionType.RECEITA) {
          totals.income += Number(transaction.amount)
        } else if (transaction.type === TransactionType.DESPESA) {
          totals.expenses += Number(transaction.amount)
        }
      }
      return totals
    },
    { income: 0, expenses: 0 }
  )
} 