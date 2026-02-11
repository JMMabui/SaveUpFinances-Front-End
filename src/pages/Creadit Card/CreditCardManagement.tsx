import { useState } from 'react'
import { CreditCardList } from '@/components/creditcard/CreditCardList'
import { CreditCardModal } from '@/components/creditcard/CreditCardModal'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useGetCreditCardsByUser } from '@/lib/HTTP/credit-card'

export function CreditCardManagement() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = useGetCreditCardsByUser(userId)

  const cards = (data?.data || []) as any[]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<any | null>(null)

  const handleAddCard = () => {
    setSelectedCard(null)
    setIsModalOpen(true)
  }

  const handleEditCard = (card: any) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
          Cartões de Crédito
        </h2>
        <Button onClick={handleAddCard} className="flex items-center gap-2">
          Novo Cartão
        </Button>
      </div>

      <CreditCardList cards={cards} onEdit={handleEditCard} />

      {isModalOpen && (
        <CreditCardModal
          card={selectedCard}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </MainLayout>
  )
}
