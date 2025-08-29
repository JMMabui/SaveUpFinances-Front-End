import type React from 'react'
import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useGetIncomeSourcesByUser, useCreateIncomeSource, useUpdateIncomeSource, useDeleteIncomeSource } from '@/HTTP/income-sources'
import { useGetIncomeByUser } from '@/HTTP/income'
import { COLORS } from '@/constants/colors'

interface IncomeSource {
  id: string
  name: string
  frequency?: string
  startDate?: string
  endDate?: string | null
  userId?: string
}

interface Transaction {
  id: string
  amount: number
  date: string
  description: string
  sourceId: string
}

export function IncomeSourceManagement() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: sourcesQuery } = useGetIncomeSourcesByUser(userId)
  const { data: incomesQuery } = useGetIncomeByUser(userId)

  const sources: IncomeSource[] = sourcesQuery?.data || []
  const incomes: Transaction[] = incomesQuery?.data || []

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState<IncomeSource | null>(null)

  const handleAddSource = () => {
    setSelectedSource(null)
    setIsModalOpen(true)
  }

  const handleEditSource = (source: IncomeSource) => {
    setSelectedSource(source)
    setIsModalOpen(true)
  }

  const deleteSource = useDeleteIncomeSource()

  const calculateTotalIncome = (sourceId: string) => {
    return incomes.filter(t => t.sourceId === sourceId).reduce((total, t) => total + (t.amount || 0), 0)
  }

  const calculateMonthlyIncome = (sourceId: string) => {
    const now = new Date()
    const month = now.getMonth()
    const year = now.getFullYear()
    return incomes
      .filter(t => {
        const d = new Date(t.date)
        return t.sourceId === sourceId && d.getMonth() === month && d.getFullYear() === year
      })
      .reduce((total, t) => total + (t.amount || 0), 0)
  }

  return (
    <div className="p-4">
      <Header />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>Fontes de Renda</h2>
        <Button onClick={handleAddSource}>Nova Fonte</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map(source => (
          <Card key={source.id} className="p-4 border" style={{ borderColor: COLORS.blue[100] }}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: COLORS.black[800] }}>{source.name}</h3>
                  <p className="text-sm" style={{ color: COLORS.black[600] }}>
                    Total: {calculateTotalIncome(source.id).toLocaleString()} Mt
                  </p>
                  <p className="text-sm" style={{ color: COLORS.black[600] }}>
                    Este mês: {calculateMonthlyIncome(source.id).toLocaleString()} Mt
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
                <h4 className="font-medium mb-2" style={{ color: COLORS.black[700] }}>Últimas Transações</h4>
                <div className="space-y-2">
                  {incomes
                    .filter(t => t.sourceId === source.id)
                    .slice(0, 3)
                    .map(transaction => (
                      <div
                        key={transaction.id}
                        className="flex justify-between items-center p-2 rounded"
                        style={{ backgroundColor: COLORS.black[50] }}
                      >
                        <div>
                          <p className="font-medium" style={{ color: COLORS.black[800] }}>{transaction.description}</p>
                          <p className="text-sm" style={{ color: COLORS.black[600] }}>
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <span className="font-medium" style={{ color: COLORS.green[700] }}>
                          {transaction.amount.toLocaleString()} Mt
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
        />
      )}
    </div>
  )
}

interface IncomeSourceModalProps {
  source: IncomeSource | null
  onClose: () => void
}

const IncomeSourceModal: React.FC<IncomeSourceModalProps> = ({
  source,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<IncomeSource>>(
    source || {
      name: '',
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const createSource = useCreateIncomeSource()
  const updateSource = useUpdateIncomeSource(source?.id || '')
  const deleteSource = useDeleteIncomeSource()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {source ? 'Editar Fonte de Renda' : 'Nova Fonte de Renda'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (source) {
              updateSource.mutate({ name: formData.name! })
            } else {
              createSource.mutate({ name: formData.name!, userId } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome da Fonte
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            {source && (
              <Button variant="danger" type="button" onClick={() => { deleteSource.mutate(source.id); onClose() }}>Excluir</Button>
            )}
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
