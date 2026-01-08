import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/constants/colors'
import { useDeleteCreditCard } from '@/lib/HTTP/credit-card'

interface CreditCard {
  id: string
  name: string
  limit: number
  dueDay: number
}

interface CreditCardListProps {
  cards: CreditCard[]
  onEdit: (card: CreditCard) => void
}

function DeleteCardButton({ id }: { id: string }) {
  const del = useDeleteCreditCard()
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => del.mutate(id)}
    >
      Excluir
    </Button>
  )
}

export function CreditCardList({ cards, onEdit }: CreditCardListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
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
                    onClick={() => onEdit(card)}
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
  )
}