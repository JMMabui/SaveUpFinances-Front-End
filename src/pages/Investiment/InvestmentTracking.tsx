import { useMemo, useState } from 'react'
import { InvestmentList } from '@/components/investment/InvestmentList'
import { InvestmentModal } from '@/components/investment/InvestmentModal'
import { InvestmentSummary } from '@/components/investment/InvestmentSummary'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useGetInvestmentsByUser } from '@/lib/HTTP/investment'
import type { investmentResponse } from '@/lib/HTTP/Type/investment.type'

export function InvestmentTracking() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = useGetInvestmentsByUser(userId)
  console.log('dados de useGetInvestmentsByUser: ', data)
  const investments: investmentResponse[] = data?.data || []

  const totalInvested = useMemo(
    () => investments.reduce((sum, i) => sum + (i.amount || 0), 0),
    [investments]
  )
  const estimatedReturn = useMemo(
    () => investments.reduce((sum, i) => sum + (i.amount || 0) * 0.1, 0),
    [investments]
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] =
    useState<investmentResponse | null>(null)

  const handleEdit = (investment: investmentResponse) => {
    setSelectedInvestment(investment)
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.black[800] }}
          >
            Investimentos
          </h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2"
          >
            Novo Investimento
          </Button>
        </div>

        <InvestmentSummary
          totalInvested={totalInvested}
          estimatedReturn={estimatedReturn}
        />

        <InvestmentList investments={investments} onEdit={handleEdit} />

        {isModalOpen && (
          <InvestmentModal
            investment={selectedInvestment}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedInvestment(null)
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

//         <InvestmentSummary
//           totalInvested={totalInvested}
//           estimatedReturn={estimatedReturn}
//         />

//         <InvestmentList
//           investments={investments}
//           onEdit={handleEdit}
//         />

//         {isModalOpen && (
//           <InvestmentModal
//             investment={selectedInvestment}
//             onClose={() => {
//               setIsModalOpen(false)
//               setSelectedInvestment(null)
//             }}
//           />
//         )}
//       </div>
//     </MainLayout>
//   )
// }
