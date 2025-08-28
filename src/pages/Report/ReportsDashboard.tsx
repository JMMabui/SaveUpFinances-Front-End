import { useState } from 'react'
import { Card } from '../../components/Card'
import { TopNavigation } from '../../components/TopNavigation'
import { Line } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { FiTrendingUp, FiArrowDownCircle, FiArrowUpCircle, FiPieChart, FiAlertCircle } from 'react-icons/fi';
import {
  mockTransactions,
  mockCategories,
  TransactionType,
  mockDebts 
} from '../../mocks/mockData';
import { Pie } from 'react-chartjs-2';
import { Header } from '@/components/Header';

Chart.register(ArcElement);

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

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

// Calcular totais
const totalIncome = mockTransactions
  .filter(t => t.type === TransactionType.RECEITA)
  .reduce((acc, t) => acc + t.amount, 0);
const totalExpenses = mockTransactions
  .filter(t => t.type === TransactionType.DESPESA)
  .reduce((acc, t) => acc + t.amount, 0);
const totalInvestments = mockTransactions
  .filter(t => t.type === TransactionType.INVESTIMENTO)
  .reduce((acc, t) => acc + t.amount, 0);
const netWorth = totalIncome - totalExpenses + totalInvestments;
const monthlyBalance = totalIncome - totalExpenses;
const savingsRate = totalIncome ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

// Resumo por categoria
const categorySummary = mockCategories.map(cat => {
  const catTransactions = mockTransactions.filter(t => t.categoryId === cat.id);
  const amount = catTransactions.reduce((acc, t) => acc + t.amount, 0);
  const percentage = totalIncome + totalExpenses
    ? (amount / (totalIncome + totalExpenses)) * 100
    : 0;
  return {
    categoryId: cat.id,
    categoryName: cat.categoryName,
    amount,
    percentage,
    type: cat.categoryType,
  };
});

// Histórico mensal
const monthlyData = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  const income = mockTransactions
    .filter(t => t.type === TransactionType.RECEITA && t.month === month)
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = mockTransactions
    .filter(t => t.type === TransactionType.DESPESA && t.month === month)
    .reduce((acc, t) => acc + t.amount, 0);
  const investments = mockTransactions
    .filter(t => t.type === TransactionType.INVESTIMENTO && t.month === month)
    .reduce((acc, t) => acc + t.amount, 0);
  return { month, year: new Date().getFullYear(), income, expenses, investments };
});

// Gráfico de evolução mensal
const chartData = {
  labels: monthlyData.map(d => getMonthName(d.month)),
  datasets: [
    {
      label: 'Receitas',
      data: monthlyData.map(d => d.income),
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34,197,94,0.1)',
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
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      tension: 0.4,
    },
  ],
};

// debts history
const totalDividas = mockDebts.reduce((acc, d) => acc + d.valor, 0);
const totalDividasPagas = mockDebts.filter(d => d.status === 'paga').reduce((acc, d) => acc + d.valor, 0);
const totalDividasPendentes = mockDebts.filter(d => d.status === 'pendente').reduce((acc, d) => acc + d.valor, 0);
const qtdPagas = mockDebts.filter(d => d.status === 'paga').length;
const qtdPendentes = mockDebts.filter(d => d.status === 'pendente').length;

const pieData = {
  labels: ['Pagas', 'Pendentes'],
  datasets: [
    {
      data: [qtdPagas, qtdPendentes],
      backgroundColor: ['#22c55e', '#f59e42'],
      borderWidth: 1,
    },
  ],
};

const proximasDividas = mockDebts
  .filter(d => d.status === 'pendente')
  .sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime())
  .slice(0, 5);

export function ReportsDashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <Header />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">Relatórios Financeiros</h2>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded shadow-sm"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-l-4 border-indigo-400 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-indigo-100 text-indigo-600 rounded-full p-2">
              <FiTrendingUp size={20} />
            </span>
            <h3 className="text-lg font-bold">Resumo Financeiro</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Receitas Totais</span>
              <span className="text-green-600 font-semibold">
                {formatCurrency(totalIncome)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Despesas Totais</span>
              <span className="text-red-600 font-semibold">
                {formatCurrency(totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Investimentos</span>
              <span className="text-blue-600 font-semibold">
                {formatCurrency(totalInvestments)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Patrimônio Líquido</span>
              <span
                className={
                  netWorth >= 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {formatCurrency(netWorth)}
              </span>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-green-400 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-green-100 text-green-600 rounded-full p-2">
              <FiArrowUpCircle size={20} />
            </span>
            <h3 className="text-lg font-bold">Balanço Mensal</h3>
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
              <span className="text-blue-600 font-semibold">
                {formatPercentage(savingsRate)}
              </span>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-400 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 rounded-full p-2">
              <FiPieChart size={20} />
            </span>
            <h3 className="text-lg font-bold">Evolução Mensal</h3>
          </div>
          <div className="h-56">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </Card>
      </div>
      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
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
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>
        <Card className="p-6">
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
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
      {/** Debt History */}
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-l-4 border-orange-400 shadow-md mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-orange-100 text-orange-600 rounded-full p-2">
            <FiAlertCircle size={20} />
          </span>
          <h3 className="text-lg font-bold">Relatório de Dívidas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex flex-col gap-1">
              <span>Total de Dívidas: <b className="text-orange-700">{formatCurrency(totalDividas)}</b></span>
              <span>Pagas: <b className="text-green-600">{formatCurrency(totalDividasPagas)} ({qtdPagas})</b></span>
              <span>Pendentes: <b className="text-orange-600">{formatCurrency(totalDividasPendentes)} ({qtdPendentes})</b></span>
            </div>
            <Pie data={pieData} />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Próximas a vencer</h4>
            <ul className="space-y-1">
              {proximasDividas.map(divida => (
                <li key={divida.id} className="flex justify-between text-sm">
                  <span>{divida.descricao}</span>
                  <span className="text-orange-700">{new Date(divida.dataVencimento).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      {/* Monthly History */}
      <Card className="p-6">
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
