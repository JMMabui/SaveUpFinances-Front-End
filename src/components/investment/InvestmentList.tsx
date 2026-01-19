import type React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/constants/colors'
import { useDeleteInvestment } from '@/lib/HTTP/investment'
import type { investmentResponse } from '@/lib/HTTP/Type/investment.type'
import { formatCurrency } from '@/lib/utils'

interface InvestmentListProps {
  investments: investmentResponse[]
  onEdit: (investment: investmentResponse) => void
}

export const InvestmentList: React.FC<InvestmentListProps> = ({
  investments,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {investments.map(investment => (
        <Card
          key={investment.id}
          className="border"
          style={{ borderColor: COLORS.blue[100] }}
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: COLORS.black[800] }}
                >
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
                  onClick={() => onEdit(investment)}
                >
                  Editar
                </Button>
                <DeleteInvestmentButton id={investment?.id!} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: COLORS.black[600] }}>
                  Valor Investido:
                </span>
                <span
                  className="font-medium"
                  style={{ color: COLORS.black[800] }}
                >
                  {formatCurrency(investment.amount)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: COLORS.black[600] }}>Criado em:</span>
                <span
                  className="font-medium"
                  style={{ color: COLORS.black[800] }}
                >
                  {investment.createdAt
                    ? new Date(investment.createdAt).toLocaleDateString('pt-BR')
                    : '-'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function DeleteInvestmentButton({ id }: { id: string }) {
  const del = useDeleteInvestment()
  return (
    <Button variant="danger" size="sm" onClick={() => del.mutate(id)}>
      Excluir
    </Button>
  )
}
