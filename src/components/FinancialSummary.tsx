import type { TransactionFormData } from '../pages/Transaction/TransactionForm'
import { Card } from './Card'

interface FinancialSummaryProps {
  transactions: TransactionFormData[]
  period?: {
    start: string
    end: string
  }
  monthlyTotals: {
    income: number
    expenses: number
  }
  totalBalance: number
}

export function FinancialSummary({
  transactions,
  monthlyTotals,
  totalBalance,
}: FinancialSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Receitas do Mês
          </h3>
          <p className="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(monthlyTotals.income)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Despesas do Mês
          </h3>
          <p className="mt-2 text-2xl font-semibold text-red-600 dark:text-red-400">
            {formatCurrency(monthlyTotals.expenses)}
          </p>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Saldo Total
          </h3>
          <p className="mt-2 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(totalBalance)}
          </p>
        </div>
      </Card>
    </div>
  )
}
