import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { mockTransactions, TransactionType } from '../../mocks/mockData'
import { TopNavigation } from '../../components/TopNavigation'
import { Header } from '@/components/Header'

interface Investment {
  id: number
  name: string
  type: string
  amount: number
  return: number
  date: Date
}

export function InvestmentTracking() {
  const [investments, setInvestments] = useState<Investment[]>(
    mockTransactions
      .filter(t => t.type === TransactionType.INVESTIMENTO)
      .map(t => ({
        id: t.id,
        name: t.description,
        type: 'Ações',
        amount: t.amount,
        return: t.amount * 0.1, // Simulando retorno de 10%
        date: t.date
      }))
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  const calculateTotalInvestment = () => {
    return investments.reduce((sum, inv) => sum + inv.amount, 0)
  }

  const calculateTotalReturn = () => {
    return investments.reduce((sum, inv) => sum + inv.return, 0)
  }

  return (
    <div className="space-y-6">
      
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Investimentos
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          Novo Investimento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Investido
            </h3>
            <p className="mt-2 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(calculateTotalInvestment())}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Retorno Total
            </h3>
            <p className="mt-2 text-2xl font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(calculateTotalReturn())}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Valor Total
            </h3>
            <p className="mt-2 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(calculateTotalInvestment() + calculateTotalReturn())}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {investments.map(investment => (
          <Card key={investment.id}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {investment.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {investment.type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedInvestment(investment)
                      setIsModalOpen(true)
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setInvestments(investments => investments.filter(i => i.id !== investment.id))}
                  >
                    Excluir
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Valor Investido:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(investment.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Retorno:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(investment.return)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Data:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {formatDate(investment.date)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
