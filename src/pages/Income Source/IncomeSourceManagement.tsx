import { useState } from 'react'
import { IncomeSourceList } from '@/components/incomesource/IncomeSourceList'
import { IncomeSourceModal } from '@/components/incomesource/IncomeSourceModal'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useGetIncomeByUser } from '@/lib/HTTP/income'
import { useGetIncomeSourcesByUser } from '@/lib/HTTP/income-sources'

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
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: sourcesQuery } = useGetIncomeSourcesByUser(userId)
  const { data: incomesQuery } = useGetIncomeByUser(userId)

  const sources: IncomeSource[] = sourcesQuery?.data || []
  const incomes: Transaction[] = incomesQuery?.data || []

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

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
          Fontes de Renda
        </h2>
        <Button onClick={handleAddSource}>Nova Fonte</Button>
      </div>

      <IncomeSourceList
        sources={sources}
        incomes={incomes}
        onEdit={handleEditSource}
      />

      {isModalOpen && (
        <IncomeSourceModal
          source={selectedSource}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </MainLayout>
  )
}
