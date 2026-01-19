import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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

interface Transaction {
  id: number
  type: 'income' | 'expense' | 'investment'
  description: string
  amount: number
  month: number
}

interface MonthlyChartProps {
  transactions: Transaction[]
  filter: 'all' | 'income' | 'expense' | 'investment'
  month: number
}

export const MonthlyChart = ({
  transactions,
  filter,
  month,
}: MonthlyChartProps) => {
  if (month === -1) {
    // Mostrar todos os meses
    // Gerar arrays de totais por mês
    const incomeData = months.map((_, idx) =>
      transactions
        .filter(t => t.type === 'income' && t.month === idx)
        .reduce((acc, t) => acc + t.amount, 0)
    )
    const expenseData = months.map((_, idx) =>
      transactions
        .filter(t => t.type === 'expense' && t.month === idx)
        .reduce((acc, t) => acc + t.amount, 0)
    )
    const investmentData = months.map((_, idx) =>
      transactions
        .filter(t => t.type === 'investment' && t.month === idx)
        .reduce((acc, t) => acc + t.amount, 0)
    )

    const datasets = []
    if (filter === 'all' || filter === 'income') {
      datasets.push({
        label: 'Receitas',
        data: incomeData,
        backgroundColor: 'rgba(34,197,94,0.7)',
      })
    }
    if (filter === 'all' || filter === 'expense') {
      datasets.push({
        label: 'Despesas',
        data: expenseData,
        backgroundColor: 'rgba(239,68,68,0.7)',
      })
    }
    if (filter === 'all' || filter === 'investment') {
      datasets.push({
        label: 'Investimentos',
        data: investmentData,
        backgroundColor: 'rgba(59,130,246,0.7)',
      })
    }

    const data = {
      labels: months,
      datasets,
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: { color: '#fff' },
        },
        title: {
          display: true,
          text: 'Resumo do Ano',
          color: '#fff',
          font: { size: 18 },
        },
      },
      scales: {
        x: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
        y: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255,255,255,0.1)' },
        },
      },
    }

    return (
      <div className="bg-gray-900 rounded-lg p-4 mb-8">
        <Bar data={data} options={options} />
      </div>
    )
  }

  // Caso mês específico
  // Filtrar transações do mês selecionado
  const monthTransactions = transactions.filter(t => t.month === month)

  // Calcular totais do mês
  const income = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
  const expense = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
  const investment = monthTransactions
    .filter(t => t.type === 'investment')
    .reduce((acc, t) => acc + t.amount, 0)

  // Montar datasets conforme filtro
  const datasets = []
  if (filter === 'all' || filter === 'income') {
    datasets.push({
      label: 'Receitas',
      data: [income],
      backgroundColor: 'rgba(34,197,94,0.7)',
    })
  }
  if (filter === 'all' || filter === 'expense') {
    datasets.push({
      label: 'Despesas',
      data: [expense],
      backgroundColor: 'rgba(239,68,68,0.7)',
    })
  }
  if (filter === 'all' || filter === 'investment') {
    datasets.push({
      label: 'Investimentos',
      data: [investment],
      backgroundColor: 'rgba(59,130,246,0.7)',
    })
  }

  const data = {
    labels: [months[month]],
    datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#fff' },
      },
      title: {
        display: true,
        text: `Resumo de ${months[month]}`,
        color: '#fff',
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-8">
      <Bar data={data} options={options} />
      <span className="text-blue-400 font-medium">
        Investimentos no mês: <span className="font-bold">MT {investment}</span>
      </span>
    </div>
  )
}
