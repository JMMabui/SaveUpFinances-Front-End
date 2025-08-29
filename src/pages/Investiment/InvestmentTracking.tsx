import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useGetInvestmentsByUser, useCreateInvestment, useUpdateInvestment, useDeleteInvestment } from '@/HTTP/investment'
import { COLORS } from '@/constants/colors'

interface Investment {
  id: string
  investimentName: string
  amount: number
  investmentTypeId: string
  investmentGoalId?: string | null
  notes?: string | null
  createdAt?: string
}

export function InvestmentTracking() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = useGetInvestmentsByUser(userId)
  const investments: Investment[] = data?.data || []

  const totalInvested = useMemo(() => investments.reduce((sum, i) => sum + (i.amount || 0), 0), [investments])
  const estimatedReturn = useMemo(() => investments.reduce((sum, i) => sum + ((i.amount || 0) * 0.1), 0), [investments])

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

  return (
    <div className="space-y-6">
      
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
          Investimentos
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          Novo Investimento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
          <div className="p-4">
            <h3 className="text-sm font-medium" style={{ color: COLORS.black[600] }}>
              Total Investido
            </h3>
            <p className="mt-2 text-2xl font-semibold" style={{ color: COLORS.blue[600] }}>
              {formatCurrency(totalInvested)}
            </p>
          </div>
        </Card>

        <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
          <div className="p-4">
            <h3 className="text-sm font-medium" style={{ color: COLORS.black[600] }}>
              Retorno Estimado (10%)
            </h3>
            <p className="mt-2 text-2xl font-semibold" style={{ color: COLORS.green[600] }}>
              {formatCurrency(estimatedReturn)}
            </p>
          </div>
        </Card>

        <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
          <div className="p-4">
            <h3 className="text-sm font-medium" style={{ color: COLORS.black[600] }}>
              Valor Total Estimado
            </h3>
            <p className="mt-2 text-2xl font-semibold" style={{ color: COLORS.green[700] }}>
              {formatCurrency(totalInvested + estimatedReturn)}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {investments.map(investment => (
          <Card key={investment.id} className="border" style={{ borderColor: COLORS.blue[100] }}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.black[800] }}>
                    {investment.investimentName}
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.black[600] }}>
                    Tipo: {investment.investmentTypeId}
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
                  <DeleteInvestmentButton id={investment.id} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[600] }}>Valor Investido:</span>
                  <span className="font-medium" style={{ color: COLORS.black[800] }}>
                    {formatCurrency(investment.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[600] }}>Criado em:</span>
                  <span className="font-medium" style={{ color: COLORS.black[800] }}>
                    {investment.createdAt ? new Date(investment.createdAt).toLocaleDateString('pt-BR') : '-'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <InvestmentModal
          investment={selectedInvestment}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

function DeleteInvestmentButton({ id }: { id: string }) {
  const del = useDeleteInvestment()
  return (
    <Button
      variant="danger"
      size="sm"
      onClick={() => del.mutate(id)}
    >
      Excluir
    </Button>
  )
}

interface InvestmentModalProps {
  investment: Investment | null
  onClose: () => void
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  investment,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<Investment>>(
    investment || {
      investimentName: '',
      amount: 0,
      investmentTypeId: '',
      investmentGoalId: null,
      notes: '',
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const create = useCreateInvestment()
  const update = useUpdateInvestment(investment?.id || '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {investment ? 'Editar Investimento' : 'Novo Investimento'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (investment) {
              update.mutate({
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            } else {
              create.mutate({
                userId,
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome do Investimento
              </label>
              <input
                type="text"
                value={formData.investimentName || ''}
                onChange={e =>
                  setFormData({ ...formData, investimentName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Valor</label>
              <input
                type="number"
                value={formData.amount ?? 0}
                onChange={e =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Tipo</label>
              <input
                type="text"
                value={formData.investmentTypeId || ''}
                onChange={e =>
                  setFormData({ ...formData, investmentTypeId: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
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
