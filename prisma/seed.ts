import { PrismaClient, AccountType, TransactionType } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criar usuário
  const user = await prisma.user.create({
    data: {
      name: 'Carlos Manjate',
      email: 'carlos.manjate@email.com',
      password: await hash('senha123', 8),
      contact: '841234567',
    },
  })

  // Criar bancos
  const banks = await Promise.all([
    prisma.bank.create({
      data: {
        bankName: 'Millennium BIM',
        logoUrl: 'https://example.com/millennium.png',
      },
    }),
    prisma.bank.create({
      data: {
        bankName: 'BCI',
        logoUrl: 'https://example.com/bci.png',
      },
    }),
    prisma.bank.create({
      data: {
        bankName: 'Standard Bank',
        logoUrl: 'https://example.com/standard.png',
      },
    }),
  ])

  // Criar contas
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        accountName: 'Conta Principal',
        accountType: AccountType.CORRENTE,
        accountHoldeName: 'Carlos Manjate',
        balance: 25000.00, // 25,000 MT
        userId: user.id,
        bankId: banks[0].id,
      },
    }),
    prisma.account.create({
      data: {
        accountName: 'Poupança',
        accountType: AccountType.POUPANCA,
        accountHoldeName: 'Carlos Manjate',
        balance: 50000.00, // 50,000 MT
        userId: user.id,
        bankId: banks[1].id,
      },
    }),
  ])

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        categoryName: 'Salário',
        categoryType: TransactionType.RECEITA,
        icon: '💰',
        color: '#4CAF50',
      },
    }),
    prisma.category.create({
      data: {
        categoryName: 'Alimentação',
        categoryType: TransactionType.DESPESA,
        icon: '🍔',
        color: '#FF5722',
      },
    }),
    prisma.category.create({
      data: {
        categoryName: 'Transporte',
        categoryType: TransactionType.DESPESA,
        icon: '🚌',
        color: '#FFC107',
      },
    }),
    prisma.category.create({
      data: {
        categoryName: 'Chapas',
        categoryType: TransactionType.DESPESA,
        icon: '🚐',
        color: '#9C27B0',
      },
    }),
    prisma.category.create({
      data: {
        categoryName: 'Investimentos',
        categoryType: TransactionType.INVESTIMENTO,
        icon: '📈',
        color: '#2196F3',
      },
    }),
    prisma.category.create({
      data: {
        categoryName: 'Remessas',
        categoryType: TransactionType.RECEITA,
        icon: '💸',
        color: '#00BCD4',
      },
    }),
  ])

  // Criar fonte de renda
  const incomeSource = await prisma.incomeSource.create({
    data: {
      name: 'Salário Empresa Local',
      userId: user.id,
    },
  })

  // Criar cartão de crédito
  const creditCard = await prisma.creditCard.create({
    data: {
      name: 'Millennium BIM',
      limit: 15000.00, // 15,000 MT
      dueDay: 15,
      userId: user.id,
    },
  })

  // Criar transações
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        description: 'Salário',
        amount: 15000.00, // 15,000 MT
        type: TransactionType.RECEITA,
        date: new Date(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        userId: user.id,
        accountId: accounts[0].id,
        categoryId: categories[0].id,
        incomeSourceId: incomeSource.id,
      },
    }),
    prisma.transaction.create({
      data: {
        description: 'Supermercado Shoprite',
        amount: 2500.00, // 2,500 MT
        type: TransactionType.DESPESA,
        date: new Date(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        userId: user.id,
        accountId: accounts[0].id,
        categoryId: categories[1].id,
      },
    }),
    prisma.transaction.create({
      data: {
        description: 'Chapas Semanal',
        amount: 500.00, // 500 MT
        type: TransactionType.DESPESA,
        date: new Date(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        userId: user.id,
        accountId: accounts[0].id,
        categoryId: categories[3].id,
      },
    }),
  ])

  // Criar orçamentos
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: categories[1].id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        limit: 5000.00, // 5,000 MT
      },
    }),
    prisma.budget.create({
      data: {
        userId: user.id,
        categoryId: categories[3].id,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        limit: 2000.00, // 2,000 MT
      },
    }),
  ])

  // Criar despesas do cartão de crédito
  const creditCardExpenses = await Promise.all([
    prisma.creditCardExpense.create({
      data: {
        description: 'Compras Game',
        amount: 1500.00, // 1,500 MT
        date: new Date(),
        categoryId: categories[1].id,
        creditCardId: creditCard.id,
      },
    }),
  ])

  // Criar notas para transações
  const transactionNotes = await Promise.all([
    prisma.transactionNote.create({
      data: {
        content: 'Pagamento do salário do mês - Empresa Local',
        transactionId: transactions[0].id,
      },
    }),
  ])

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 