import { ArrowBigDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { COLORS } from '@/constants/colors'
import { useDeleteCreditCard } from '@/lib/HTTP/credit-card'
import { formatCurrency } from '@/lib/utils'
import { CreditCardExpensesList } from './CreditCardExpensesList'

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
    <Button variant="destructive" size="sm" onClick={() => del.mutate(id)}>
      Excluir
    </Button>
  )
}

export function CreditCardList({ cards, onEdit }: CreditCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map(card => {
        return (
          <Card
            key={card.id}
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Faturas
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Faturas do Cartão</DialogTitle>
                        <DialogDescription>
                          Aqui estão as faturas do cartão de crédito.
                        </DialogDescription>
                      </DialogHeader>
                      <CreditCardExpensesList creditCardId={card.id} />
                      <DialogFooter>
                        <DialogClose asChild>
                          <div className="flex justify-between w-full">
                            <Button variant="outline" size="sm">
                              <ArrowBigDown className="mr-2 h-4 w-4" />
                              Baixar Faturas
                            </Button>
                            <Button variant="secondary">Fechar</Button>
                          </div>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[600] }}>
                    Limite Total:
                  </span>
                  <span
                    className="font-medium"
                    style={{ color: COLORS.black[800] }}
                  >
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
