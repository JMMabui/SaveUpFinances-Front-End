import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { COLORS } from '@/constants/colors'
import {
  useCreateCreditCard,
  useUpdateCreditCard,
} from '@/lib/HTTP/credit-card'

interface CreditCard {
  id: string
  name: string
  limit: number
  dueDay: number
}

interface CreditCardModalProps {
  card: CreditCard | null
  onClose: () => void
}

export function CreditCardModal({ card, onClose }: CreditCardModalProps) {
  const [formData, setFormData] = useState<Partial<CreditCard>>(
    card || {
      name: '',
      limit: 0,
      dueDay: 1,
    }
  )

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const create = useCreateCreditCard()
  const update = useUpdateCreditCard(card?.id || '')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: COLORS.black[800] }}
        >
          {card ? 'Editar Cartão' : 'Novo Cartão'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (card) {
              update.mutate({
                name: formData.name!,
                limit: formData.limit!,
                dueDay: formData.dueDay!,
              })
            } else {
              create.mutate({
                name: formData.name!,
                limit: formData.limit!,
                dueDay: formData.dueDay!,
                userId,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4">
            <div>
              <Input
                label="Nome do Cartão"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Input
                label="Limite"
                type="number"
                value={formData.limit ?? 0}
                onChange={e =>
                  setFormData({
                    ...formData,
                    limit: Number(e.target.value),
                  })
                }
                min={0}
                step={0.01}
                required
              />
            </div>

            <div>
              <Input
                label="Dia de Vencimento"
                type="number"
                value={formData.dueDay ?? 1}
                onChange={e =>
                  setFormData({
                    ...formData,
                    dueDay: Number(e.target.value),
                  })
                }
                min={1}
                max={31}
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
