import { CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { useGetIncomeByUser } from '@/lib/HTTP/income'
import { COLORS } from '../constants/colors'

export function FinancesResume() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: incomeData, isLoading: loadingIncome } =
    useGetIncomeByUser(userId)
  const { data: expensesData, isLoading: loadingExpenses } =
    useGetExpensesByUser(userId)

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
  const saldo = totalIncome - totalExpenses

  const situationPositive = saldo >= 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <FinanceCard
        title="Saldo Actual"
        value={
          loadingIncome || loadingExpenses
            ? '...'
            : `${saldo.toLocaleString()} Mt`
        }
        color={COLORS.green[600]}
      />

      <FinanceCard
        title="Despesas Totais"
        value={loadingExpenses ? '...' : `${totalExpenses.toLocaleString()} Mt`}
        color={COLORS.blue[600]}
      />

      <FinanceCard
        title="Rendimento Mensal"
        value={loadingIncome ? '...' : `${totalIncome.toLocaleString()} Mt`}
        color={COLORS.yellow[600]}
      />

      <Card
        className="text-white"
        style={{
          backgroundColor: situationPositive
            ? COLORS.green[700]
            : COLORS.black[700],
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Situação Financeira</CardTitle>
          {situationPositive ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <XCircle className="w-5 h-5 text-white" />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {situationPositive ? 'Positivo' : 'Negativo'}
          </p>
          <p className="text-sm opacity-80">
            Resultado:{' '}
            {loadingIncome || loadingExpenses
              ? '...'
              : `${saldo.toLocaleString()} Mt`}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function FinanceCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  return (
    <Card
      className="text-white hover:shadow-lg transition-shadow duration-200"
      style={{ backgroundColor: color }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
