import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { COLORS } from '@/constants/colors'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { useGetIncomeByUser } from '@/lib/HTTP/income'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export function CashFlowChart() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: incomeData, isLoading: loadingIncome } =
    useGetIncomeByUser(userId)
  const { data: expensesData, isLoading: loadingExpenses } =
    useGetExpensesByUser(userId)

  const incomes = incomeData?.data || []
  const expenses = expensesData?.data || []

  const monthlyIncome = months.map((_, idx) =>
    incomes
      .filter((t: any) => new Date(t.date).getMonth() === idx)
      .reduce((acc: number, t: any) => acc + (t.amount || 0), 0)
  )
  const monthlyExpenses = months.map((_, idx) =>
    expenses
      .filter((t: any) => new Date(t.date).getMonth() === idx)
      .reduce((acc: number, t: any) => acc + (t.amount || 0), 0)
  )

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Receitas',
        data: monthlyIncome,
        borderColor: COLORS.green[600],
        backgroundColor: COLORS.green[100],
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: monthlyExpenses,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' as const } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Caixa</CardTitle>
      </CardHeader>
      <CardContent>
        {loadingIncome || loadingExpenses ? (
          <div className="h-40 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-green-500 animate-spin" />
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </CardContent>
    </Card>
  )
}
