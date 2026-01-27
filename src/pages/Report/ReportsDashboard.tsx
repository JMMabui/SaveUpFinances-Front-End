import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { useMemo, useState } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import {
  FiAlertCircle,
  FiArrowUpCircle,
  FiPieChart,
  FiTrendingUp,
} from 'react-icons/fi'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COLORS } from '@/constants/colors'
import { useGetDebtsByUser } from '@/lib/HTTP/debts'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { useGetIncomeByUser } from '@/lib/HTTP/income'
import { formatCurrency, formatPercentage, getMonthName } from '@/lib/utils'

Chart.register(ArcElement)
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

export function ReportsDashboard() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: incomeData } = useGetIncomeByUser(userId)
  const { data: expensesData } = useGetExpensesByUser(userId)
  const { data: debtsData } = useGetDebtsByUser(userId)

  const incomes = incomeData?.data || []
  const expenses = expensesData?.data || []
  const debts = debtsData?.data || []

  const totalIncome = useMemo(
    () =>
      incomes.reduce((acc: number, t: any) => acc + (Number(t.amount) || 0), 0),
    [incomes]
  )
  const totalExpenses = useMemo(
    () =>
      expenses.reduce(
        (acc: number, t: any) => acc + (Number(t.amount) || 0),
        0
      ),
    [expenses]
  )
  const totalInvestments = 0
  const netWorth = totalIncome - totalExpenses + totalInvestments
  const monthlyBalance = totalIncome - totalExpenses
  const savingsRate = totalIncome
    ? ((totalIncome - totalExpenses) / totalIncome) * 100
    : 0

  const categorySummary = useMemo(() => {
    const map = new Map<
      string,
      { amount: number; type: 'income' | 'expense' }
    >()
    for (const t of incomes) {
      const key = t.sourceId || 'income'
      map.set(key, {
        amount: (map.get(key)?.amount || 0) + (Number(t.amount) || 0),
        type: 'income',
      })
    }
    for (const t of expenses) {
      const key = t.categoryId || 'expense'
      map.set(key, {
        amount: (map.get(key)?.amount || 0) + (Number(t.amount) || 0),
        type: 'expense',
      })
    }
    const total = totalIncome + totalExpenses

    return Array.from(map.entries()).map(([categoryId, v]) => {
      const categoryName = v.type === 'income' ? 'Receita' : categoryId
      return {
        categoryId,
        categoryName,
        amount: v.amount,
        percentage: total ? (v.amount / total) * 100 : 0,
        type: v.type === 'income' ? 'RECEITA' : 'DESPESA',
      }
    })
  }, [incomes, expenses, totalIncome, totalExpenses])

  const monthlyData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = i + 1
      const year = new Date().getFullYear()
      const income = incomes
        .filter((t: any) => new Date(t.date).getMonth() + 1 === month)
        .reduce((acc: number, t: any) => acc + (Number(t.amount) || 0), 0)
      const exp = expenses
        .filter((t: any) => new Date(t.date).getMonth() + 1 === month)
        .reduce((acc: number, t: any) => acc + (Number(t.amount) || 0), 0)
      const investments = 0
      return { month, year, income, expenses: exp, investments }
    })
  }, [incomes, expenses])

  const chartData = {
    labels: monthlyData.map(d => getMonthName(d.month)),
    datasets: [
      {
        label: 'Receitas',
        data: monthlyData.map(d => d.income),
        borderColor: COLORS.green[600],
        backgroundColor: COLORS.green[100],
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: monthlyData.map(d => d.expenses),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        tension: 0.4,
      },
      {
        label: 'Investimentos',
        data: monthlyData.map(d => d.investments),
        borderColor: COLORS.blue[600],
        backgroundColor: COLORS.blue[100],
        tension: 0.4,
      },
    ],
  }

  const qtdPagas = debts.filter((d: any) => d.status === 'PAID').length
  const qtdPendentes = debts.filter((d: any) => d.status === 'PENDING').length

  const pieData = {
    labels: ['Pagas', 'Pendentes'],
    datasets: [
      {
        data: [qtdPagas, qtdPendentes],
        backgroundColor: [COLORS.green[600], COLORS.yellow[500]],
        borderWidth: 1,
      },
    ],
  }

  const proximasDividas = debts
    .filter((d: any) => d.status === 'PENDING')
    .sort(
      (a: any, b: any) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5)

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  function exportCSV() {
    const rows = [
      ['Mês', 'Receitas', 'Despesas', 'Investimentos'],
      ...monthlyData.map(d => [
        getMonthName(d.month),
        String(d.income),
        String(d.expenses),
        String(d.investments),
      ]),
    ]
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `relatorio_${selectedYear}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function exportPDF() {
    window.print()
  }

  return (
    <MainLayout>
      <div
        className="p-4"
        style={{
          background: `linear-gradient(to bottom right, ${COLORS.blue[50]}, white)`,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-3xl font-extrabold"
            style={{ color: COLORS.black[800] }}
          >
            Relatórios Financeiros
          </h2>
          <Select
            value={String(selectedYear)}
            onValueChange={value => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-fit min-w-32">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - 2 + i
              ).map(year => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 mb-4">
          <Button onClick={exportCSV} variant="secondary">
            Exportar CSV
          </Button>
          <Button onClick={exportPDF}>Exportar PDF</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card
            className="p-6 border-l-4"
            style={{
              borderLeftColor: COLORS.blue[400],
              background:
                'linear-gradient(to bottom right, ' +
                COLORS.blue[50] +
                ', white)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="rounded-full p-2"
                style={{
                  backgroundColor: COLORS.blue[100],
                  color: COLORS.blue[600],
                }}
              >
                <FiTrendingUp size={20} />
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: COLORS.black[800] }}
              >
                Resumo Financeiro
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Receitas Totais</span>
                <span
                  style={{ color: COLORS.green[600] }}
                  className="font-semibold"
                >
                  {formatCurrency(totalIncome)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Despesas Totais</span>
                <span style={{ color: '#ef4444' }} className="font-semibold">
                  {formatCurrency(totalExpenses)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Investimentos</span>
                <span
                  style={{ color: COLORS.blue[600] }}
                  className="font-semibold"
                >
                  {formatCurrency(totalInvestments)}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Patrimônio Líquido</span>
                <span
                  className={netWorth >= 0 ? 'text-green-600' : 'text-red-600'}
                >
                  {formatCurrency(netWorth)}
                </span>
              </div>
            </div>
          </Card>
          <Card
            className="p-6 border-l-4"
            style={{
              borderLeftColor: COLORS.green[400],
              background:
                'linear-gradient(to bottom right, ' +
                COLORS.green[50] +
                ', white)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="rounded-full p-2"
                style={{
                  backgroundColor: COLORS.green[100],
                  color: COLORS.green[600],
                }}
              >
                <FiArrowUpCircle size={20} />
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: COLORS.black[800] }}
              >
                Balanço Mensal
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Saldo do Mês</span>
                <span
                  className={
                    monthlyBalance >= 0
                      ? 'text-green-600 font-semibold'
                      : 'text-red-600 font-semibold'
                  }
                >
                  {formatCurrency(monthlyBalance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Poupança</span>
                <span
                  style={{ color: COLORS.blue[600] }}
                  className="font-semibold"
                >
                  {formatPercentage(savingsRate)}
                </span>
              </div>
            </div>
          </Card>
          <Card
            className="p-6 border-l-4"
            style={{
              borderLeftColor: COLORS.blue[400],
              background:
                'linear-gradient(to bottom right, ' +
                COLORS.blue[50] +
                ', white)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="rounded-full p-2"
                style={{
                  backgroundColor: COLORS.blue[100],
                  color: COLORS.blue[600],
                }}
              >
                <FiPieChart size={20} />
              </span>
              <h3
                className="text-lg font-bold"
                style={{ color: COLORS.black[800] }}
              >
                Evolução Mensal
              </h3>
            </div>
            <div className="h-56">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: 'top' } },
                }}
              />
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: COLORS.black[800] }}
            >
              Despesas por Categoria
            </h3>
            <div className="space-y-4">
              {categorySummary
                .filter(cat => cat.type === 'DESPESA')
                .map(category => (
                  <div key={category.categoryId}>
                    <div className="flex justify-between mb-1">
                      <span>{category.categoryName}</span>
                      <span>{formatCurrency(category.amount)}</span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: COLORS.black[200] }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          background:
                            'linear-gradient(to right, #f87171, #dc2626)',
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: COLORS.black[800] }}
            >
              Receitas por Categoria
            </h3>
            <div className="space-y-4">
              {categorySummary
                .filter(cat => cat.type === 'RECEITA')
                .map(category => (
                  <div key={category.categoryId}>
                    <div className="flex justify-between mb-1">
                      <span>{category.categoryName}</span>
                      <span>{formatCurrency(category.amount)}</span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: COLORS.black[200] }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          background:
                            'linear-gradient(to right, ' +
                            COLORS.green[400] +
                            ', ' +
                            COLORS.green[600] +
                            ')',
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
        <Card
          className="p-6 border-l-4"
          style={{
            borderLeftColor: COLORS.yellow[500],
            background:
              'linear-gradient(to bottom right, ' +
              COLORS.yellow[50] +
              ', white)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="rounded-full p-2"
              style={{
                backgroundColor: COLORS.yellow[100],
                color: COLORS.yellow[600],
              }}
            >
              <FiAlertCircle size={20} />
            </span>
            <h3
              className="text-lg font-bold"
              style={{ color: COLORS.black[800] }}
            >
              Relatório de Dívidas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 flex flex-col gap-1">
                <span>
                  Total de Dívidas:{' '}
                  <b style={{ color: COLORS.yellow[700] }}>
                    {formatCurrency(
                      debts.reduce(
                        (acc: number, d: any) => acc + (d.amount || 0),
                        0
                      )
                    )}
                  </b>
                </span>
                <span>
                  Pagas: <b style={{ color: COLORS.green[600] }}>{qtdPagas}</b>
                </span>
                <span>
                  Pendentes:{' '}
                  <b style={{ color: COLORS.yellow[600] }}>{qtdPendentes}</b>
                </span>
              </div>
              <Pie data={pieData} />
            </div>
            <div>
              <h4
                className="font-semibold mb-2"
                style={{ color: COLORS.black[800] }}
              >
                Próximas a vencer
              </h4>
              <ul className="space-y-1">
                {proximasDividas.map((divida: any) => (
                  <li key={divida.id} className="flex justify-between text-sm">
                    <span>{divida.description}</span>
                    <span style={{ color: COLORS.yellow[700] }}>
                      {new Date(divida.dueDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: COLORS.black[800] }}
          >
            Histórico Mensal
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Mês</th>
                  <th className="text-right py-2">Receitas</th>
                  <th className="text-right py-2">Despesas</th>
                  <th className="text-right py-2">Investimentos</th>
                  <th className="text-right py-2">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map(data => (
                  <tr key={`${data.year}-${data.month}`} className="border-b">
                    <td className="py-2">
                      {getMonthName(data.month)}/{data.year}
                    </td>
                    <td
                      className="text-right py-2"
                      style={{ color: COLORS.green[600] }}
                    >
                      {formatCurrency(data.income)}
                    </td>
                    <td
                      className="text-right py-2"
                      style={{ color: '#ef4444' }}
                    >
                      {formatCurrency(data.expenses)}
                    </td>
                    <td
                      className="text-right py-2"
                      style={{ color: COLORS.blue[600] }}
                    >
                      {formatCurrency(data.investments)}
                    </td>
                    <td
                      className="text-right py-2"
                      style={{
                        color:
                          data.income - data.expenses >= 0
                            ? COLORS.green[600]
                            : '#ef4444',
                      }}
                    >
                      {formatCurrency(data.income - data.expenses)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}
