import {
  AlertTriangle,
  CreditCard,
  DollarSign,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { getAccountsByUserId } from '@/lib/HTTP/account'
import { useGetCreditCardsByUser } from '@/lib/HTTP/credit-card'
import { useGetDebtsByUser } from '@/lib/HTTP/debts'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { useGetIncomeByUser } from '@/lib/HTTP/income'
import type { accountResponse } from '@/lib/HTTP/Type/account.type'
import { formatCurrency } from '@/lib/utils'
import { COLORS } from '../constants/colors'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Spinner } from './ui/spinner'

interface QuickStatProps {
  title: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  color: string
}

const QuickStat = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color,
}: QuickStatProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg`}
          style={{ backgroundColor: `${color}20` }}
        >
          <div style={{ color: color }}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm ${getChangeColor()}`}
          >
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function QuickStats() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: accountsData, isLoading: loadingAccounts } =
    getAccountsByUserId(userId)
  const { data: incomeData, isLoading: loadingIncome } =
    useGetIncomeByUser(userId)
  const { data: expensesData, isLoading: loadingExpenses } =
    useGetExpensesByUser({ userId })
  const { data: debtsData, isLoading: loadingDebts } =
    useGetDebtsByUser({ userId })
  const { data: creditCardsData, isLoading: loadingCards } =
    useGetCreditCardsByUser({ userId })

  const accountsContainer = accountsData?.data as any
  const accounts: accountResponse[] = Array.isArray(accountsContainer)
    ? accountsContainer
    : accountsContainer?.accounts || []

  console.log('Accounts', accounts)

  const totalBalance = accounts.reduce(
    (sum: number, acc: any) => sum + (Number(acc?.balance) || 0),
    0
  )

  console.log('Total Balance:', totalBalance)

  const incomes = incomeData?.data || []
  const expenses = expensesData?.data || []
  const totalIncome = incomes.reduce(
    (sum: number, i: any) => sum + (Number(i?.amount) || 0),
    0
  )
  const totalExpenses = expenses.reduce(
    (sum: number, e: any) => sum + (Number(e?.amount) || 0),
    0
  )
  const savings = Math.max(totalIncome - totalExpenses, 0)

  const debts = debtsData?.data || []
  // console.log('Debts Data', debtsData)
  const pendingDebts = debts.filter((d: any) => d?.status === 'PENDING')
  const pendingDebtsAmount = pendingDebts.reduce(
    (sum: number, d: any) => sum + (Number(d?.amount) || 0),
    0
  )

  const creditCards = creditCardsData?.data || []

  const isLoading =
    loadingAccounts ||
    loadingIncome ||
    loadingExpenses ||
    loadingDebts ||
    loadingCards

  const stats = [
    {
      title: 'Saldo Total',
      value: `${formatCurrency(totalBalance).replace('MZN ', '')} Mt`,
      icon: <DollarSign className="w-5 h-5" />,
      color: COLORS.green[600],
    },
    {
      title: 'Receitas Totais',
      value: `${formatCurrency(totalIncome).replace('MZN ', '')} Mt`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: COLORS.green[500],
    },
    {
      title: 'Despesas Totais',
      value: `${formatCurrency(totalExpenses).replace('MZN ', '')} Mt`,
      icon: <TrendingDown className="w-5 h-5" />,
      color: '#ef4444',
    },
    {
      title: 'Poupança (estimada)',
      value: `${formatCurrency(savings).replace('MZN ', '')} Mt`,
      icon: <PiggyBank className="w-5 h-5" />,
      color: COLORS.blue[600],
    },
    {
      title: 'Cartões de Crédito',
      value: `${Array.isArray(creditCards) ? creditCards.length : 0}`,
      icon: <CreditCard className="w-5 h-5" />,
      color: COLORS.yellow[600],
    },
    {
      title: 'Dívidas Pendentes',
      value: `${formatCurrency(pendingDebtsAmount).replace('MZN ', '')} Mt`,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: COLORS.black[600],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {isLoading ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex items-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">
            Carregando estatísticas...
          </span>
        </div>
      ) : (
        stats.map((stat, index) => <QuickStat key={index} {...stat} />)
      )}
    </div>
  )
}
