import { useState } from 'react'
import { Card } from './Card'
import { TopNavigation } from './TopNavigation'

interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  totalInvestments: number
  netWorth: number
  monthlyBalance: number
  savingsRate: number
}

interface CategorySummary {
  categoryId: number
  categoryName: string
  amount: number
  percentage: number
  type: 'RECEITA' | 'DESPESA' | 'INVESTIMENTO'
}

interface MonthlyData {
  month: number
  year: number
  income: number
  expenses: number
  investments: number
}

export function ReportsDashboard() {
  const [summary, setSummary] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 0,
    netWorth: 0,
    monthlyBalance: 0,
    savingsRate: 0,
  })

  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const getMonthName = (month: number) => {
    return new Date(2000, month - 1).toLocaleString('pt-BR', { month: 'long' })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'MZN',
    })
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="p-4">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Page Title and Year Selector */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Relatórios Financeiros</h2>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {Array.from(
            { length: 5 },
            (_, i) => new Date().getFullYear() - 2 + i
          ).map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Resumo Financeiro</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Receitas Totais</span>
              <span className="text-green-600">
                {formatCurrency(summary.totalIncome)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Despesas Totais</span>
              <span className="text-red-600">
                {formatCurrency(summary.totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Investimentos</span>
              <span className="text-blue-600">
                {formatCurrency(summary.totalInvestments)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Patrimônio Líquido</span>
              <span
                className={
                  summary.netWorth >= 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {formatCurrency(summary.netWorth)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Balanço Mensal</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Saldo do Mês</span>
              <span
                className={
                  summary.monthlyBalance >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {formatCurrency(summary.monthlyBalance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Poupança</span>
              <span className="text-blue-600">
                {formatPercentage(summary.savingsRate)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Evolução Mensal</h3>
          <div className="h-48">{/* Add chart component here */}</div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Despesas por Categoria</h3>
          <div className="space-y-4">
            {categorySummary
              .filter(cat => cat.type === 'DESPESA')
              .map(category => (
                <div key={category.categoryId}>
                  <div className="flex justify-between mb-1">
                    <span>{category.categoryName}</span>
                    <span>{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Receitas por Categoria</h3>
          <div className="space-y-4">
            {categorySummary
              .filter(cat => cat.type === 'RECEITA')
              .map(category => (
                <div key={category.categoryId}>
                  <div className="flex justify-between mb-1">
                    <span>{category.categoryName}</span>
                    <span>{formatCurrency(category.amount)}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Monthly History */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Histórico Mensal</h3>
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
                  <td className="text-right py-2 text-green-600">
                    {formatCurrency(data.income)}
                  </td>
                  <td className="text-right py-2 text-red-600">
                    {formatCurrency(data.expenses)}
                  </td>
                  <td className="text-right py-2 text-blue-600">
                    {formatCurrency(data.investments)}
                  </td>
                  <td
                    className={`text-right py-2 ${
                      data.income - data.expenses >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
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
  )
}
