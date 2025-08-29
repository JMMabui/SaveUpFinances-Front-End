import type React from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useGetCreditCardsByUser, useCreateCreditCard, useUpdateCreditCard, useDeleteCreditCard } from '@/HTTP/credit-card'
import { COLORS } from '@/constants/colors'

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleAddCard = () => {
    setSelectedCard(null)
    setIsModalOpen(true)
  }

  const handleEditCard = (card: CreditCard) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  return (
    <div className="p-4">
      <Header />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>Cartões de Crédito</h2>
        <Button onClick={handleAddCard} className="flex items-center gap-2">
          Novo Cartão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map(card => {
          return (
            <Card key={card.id} className="border" style={{ borderColor: COLORS.blue[100] }}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: COLORS.black[800] }}>
                      {card.name}
                    </h3>
                    <p className="text-sm" style={{ color: COLORS.black[600] }}>
                      Vencimento: dia {card.dueDay}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditCard(card)}
                    >
                      Editar
                    </Button>
                    <DeleteCardButton id={card.id} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: COLORS.black[600] }}>Limite Total:</span>
                    <span className="font-medium" style={{ color: COLORS.black[800] }}>
                      {formatCurrency(card.limit)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {isModalOpen && (
        <CreditCardModal
          card={selectedCard}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  )
}

function DeleteCardButton({ id }: { id: string }) {
  const del = useDeleteCreditCard()
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

interface CreditCardModalProps {
  card: CreditCard | null
  onClose: () => void
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({
  card,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<CreditCard>>(
    card || {
      name: '',
      limit: 0,
      dueDay: 1,
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const create = useCreateCreditCard()
  const update = useUpdateCreditCard(card?.id || '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.black[800] }}>
          {card ? 'Editar Cartão' : 'Novo Cartão'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (card) {
              update.mutate({ name: formData.name!, limit: formData.limit!, dueDay: formData.dueDay! })
            } else {
              create.mutate({ name: formData.name!, limit: formData.limit!, dueDay: formData.dueDay!, userId } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Nome do Cartão
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

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>Limite</label>
              <input
                type="number"
                value={formData.limit ?? 0}
                onChange={e =>
                  setFormData({
                    ...formData,
                    limit: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                Dia de Vencimento
              </label>
              <input
                type="number"
                value={formData.dueDay ?? 1}
                onChange={e =>
                  setFormData({
                    ...formData,
                    dueDay: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="1"
                max="31"
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
