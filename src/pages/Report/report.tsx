import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Title } from '@/components/ui/title'
import { useApi } from '@/hooks/useApi'
import { reportsService } from '@/lib/apiServices'
import { MainLayout } from '@/components/layout/mainLayout'

const FinancialReportsPage = () => {
  const { execute } = useApi()
  const [dashboard, setDashboard] = useState<any>(null)
  const [evolution, setEvolution] = useState<any[]>([])
  const [cashFlow, setCashFlow] = useState<any>(null)
  const [financialHealth, setFinancialHealth] = useState<any>(null)
  const [expenseAnalysis, setExpenseAnalysis] = useState<any[]>([])
  const [incomeAnalysis, setIncomeAnalysis] = useState<any[]>([])

  const currentMonth = dayjs().month() + 1
  const currentYear = dayjs().year()

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      // Dashboard
      const dashboardResp = await execute(() =>
        reportsService.getDashboard(currentMonth, currentYear)
      )
      if (dashboardResp?.data) {
        setDashboard(dashboardResp.data)
      }

      // Evolution
      const evolutionResp = await execute(() =>
        reportsService.getEvolution(currentYear)
      )
      if (evolutionResp?.data) {
        setEvolution(
          Array.isArray(evolutionResp.data) ? evolutionResp.data : []
        )
      }

      // Cash Flow
      const cashFlowResp = await execute(() => reportsService.getCashFlow())
      if (cashFlowResp?.data) {
        setCashFlow(cashFlowResp.data)
      }

      // Financial Health
      const healthResp = await execute(() =>
        reportsService.getFinancialHealth()
      )
      if (healthResp?.data) {
        setFinancialHealth(healthResp.data)
      }

      // Expense Analysis
      const expenseResp = await execute(() =>
        reportsService.getExpenseAnalysis()
      )
      if (expenseResp?.data) {
        setExpenseAnalysis(
          Array.isArray(expenseResp.data) ? expenseResp.data : []
        )
      }

      // Income Analysis
      const incomeResp = await execute(() => reportsService.getIncomeAnalysis())
      if (incomeResp?.data) {
        setIncomeAnalysis(Array.isArray(incomeResp.data) ? incomeResp.data : [])
      }
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error)
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <MainLayout>
      <div className="space-y-6">
      <div>
        <Title>Relatórios Financeiros</Title>
        <p className="text-gray-600">
          Análise detalhada de sua situação financeira
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Saldo Total</p>
          <p className="text-2xl font-bold mt-2">
            {dashboard?.totalBalance?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'MZN',
            })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Receita</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {dashboard?.totalIncome?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'MZN',
            })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Despesa</p>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {dashboard?.totalExpense?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'MZN',
            })}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Saúde Financeira</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {financialHealth?.score || 0}%
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution Chart */}
        {evolution.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Evolução Mensal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#00C49F"
                  name="Receita"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#FF8042"
                  name="Despesa"
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#0088FE"
                  name="Saldo"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Expense Analysis Pie Chart */}
        {expenseAnalysis.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Despesas por Categoria</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseAnalysis.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Cash Flow Chart */}
        {cashFlow && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Fluxo de Caixa</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[cashFlow]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inflow" fill="#00C49F" name="Entradas" />
                <Bar dataKey="outflow" fill="#FF8042" name="Saídas" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Income Analysis Pie Chart */}
        {incomeAnalysis.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Receitas por Fonte</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeAnalysis.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      {financialHealth?.recommendations && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Recomendações</h3>
          <ul className="space-y-2">
            {financialHealth.recommendations.map((rec: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      </div>
    </MainLayout>
  )
}

export default FinancialReportsPage
