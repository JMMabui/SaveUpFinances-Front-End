import type React from 'react'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/constants/colors'
import { formatCurrency } from '@/lib/utils'

interface InvestmentSummaryProps {
  totalInvested: number
  estimatedReturn: number
}

export const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  totalInvested,
  estimatedReturn,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
        <div className="p-4">
          <h3
            className="text-sm font-medium"
            style={{ color: COLORS.black[600] }}
          >
            Total Investido
          </h3>
          <p
            className="mt-2 text-2xl font-semibold"
            style={{ color: COLORS.blue[600] }}
          >
            {formatCurrency(totalInvested)}
          </p>
        </div>
      </Card>

      <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
        <div className="p-4">
          <h3
            className="text-sm font-medium"
            style={{ color: COLORS.black[600] }}
          >
            Retorno Estimado (10%)
          </h3>
          <p
            className="mt-2 text-2xl font-semibold"
            style={{ color: COLORS.green[600] }}
          >
            {formatCurrency(estimatedReturn)}
          </p>
        </div>
      </Card>

      <Card className="border" style={{ borderColor: COLORS.blue[100] }}>
        <div className="p-4">
          <h3
            className="text-sm font-medium"
            style={{ color: COLORS.black[600] }}
          >
            Valor Total Estimado
          </h3>
          <p
            className="mt-2 text-2xl font-semibold"
            style={{ color: COLORS.green[700] }}
          >
            {formatCurrency(totalInvested + estimatedReturn)}
          </p>
        </div>
      </Card>
    </div>
  )
}
