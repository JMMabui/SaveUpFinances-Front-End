import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

interface IncomeSourceListProps {
  sources: IncomeSource[]
  incomes: Transaction[]
  onEdit: (source: IncomeSource) => void
}

export function IncomeSourceList({ sources, incomes, onEdit }: IncomeSourceListProps) {
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
                onClick={() => onEdit(source)}
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
  )
}