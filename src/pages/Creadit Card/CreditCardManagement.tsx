import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/mainLayout'
import { useGetCreditCardsByUser } from '@/lib/HTTP/credit-card'
import { COLORS } from '@/constants/colors'
import { CreditCardList } from '@/components/creditcard/CreditCardList'
import { CreditCardModal } from '@/components/creditcard/CreditCardModal'

interface CreditCard {
  id: string
  name: string
  limit: number
  dueDay: number
}

export function CreditCardManagement() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = useGetCreditCardsByUser(userId)

  const cards: CreditCard[] = data?.data || []
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null)

  const handleAddCard = () => {
    setSelectedCard(null)
    setIsModalOpen(true)
  }

  const handleEditCard = (card: CreditCard) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>Cartões de Crédito</h2>
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
