import type React from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TopNavigation } from '../../components/TopNavigation'

interface IncomeSource {
  id: number
  name: string
  transactions: Transaction[]
}

interface Transaction {
  id: number
  amount: number
  date: string
  description: string
}

export function IncomeSourceManagement() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState<IncomeSource | null>(
    null
  )

  const handleAddSource = () => {
    setSelectedSource(null)
    setIsModalOpen(true)
  }

  const handleEditSource = (source: IncomeSource) => {
    setSelectedSource(source)
    setIsModalOpen(true)
  }

  const calculateTotalIncome = (transactions: Transaction[]) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    )
  }

  const calculateMonthlyIncome = (transactions: Transaction[]) => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return transactions
      .filter(transaction => {
        const date = new Date(transaction.date)
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        )
      })
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  return (
    <div className="p-4">
      <TopNavigation />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fontes de Renda</h2>
        <Button onClick={handleAddSource}>Nova Fonte</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incomeSources.map(source => (
          <Card key={source.id} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{source.name}</h3>
                  <p className="text-sm text-gray-600">
                    Total: R${' '}
                    {calculateTotalIncome(source.transactions).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Este mês: R${' '}
                    {calculateMonthlyIncome(source.transactions).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleEditSource(source)}
                >
                  Editar
                </Button>
              </div>

              <div>
                <h4 className="font-medium mb-2">Últimas Transações</h4>
                <div className="space-y-2">
                  {source.transactions.slice(0, 3).map(transaction => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString(
                            'pt-BR'
                          )}
                        </p>
                      </div>
                      <span className="font-medium">
                        R$ {transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <IncomeSourceModal
          source={selectedSource}
          onClose={() => setIsModalOpen(false)}
          onSave={source => {
            // Handle save logic here
            source.id
            source.name
            source.transactions
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

interface IncomeSourceModalProps {
  source: IncomeSource | null
  onClose: () => void
  onSave: (source: Partial<IncomeSource>) => void
}

const IncomeSourceModal: React.FC<IncomeSourceModalProps> = ({
  source,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<IncomeSource>>(
    source || {
      name: '',
    }
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {source ? 'Editar Fonte de Renda' : 'Nova Fonte de Renda'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSave(formData)
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome da Fonte
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
