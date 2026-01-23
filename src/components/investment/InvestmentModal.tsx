import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'
import { useCreateInvestment, useUpdateInvestment } from '@/lib/HTTP/investment'
import type { investmentRequest } from '@/lib/HTTP/Type/investment.type'

interface InvestmentModalProps {
  investment: (investmentRequest & { id?: string }) | null
  onClose: () => void
}

export const InvestmentModal: React.FC<InvestmentModalProps> = ({
  investment,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<investmentRequest>>(
    investment || {
      investimentName: '',
      amount: 0,
      investmentTypeId: '',
      investmentGoalId: null,
      notes: '',
    }
  )

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const create = useCreateInvestment()
  const update = useUpdateInvestment(investment?.id || '')

  return (
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle style={{ color: COLORS.black[800] }}>
            {investment ? 'Editar Investimento' : 'Novo Investimento'}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={e => {
            e.preventDefault()
            if (investment) {
              update.mutate({
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            } else {
              create.mutate({
                userId,
                investimentName: formData.investimentName!,
                amount: formData.amount!,
                investmentTypeId: formData.investmentTypeId!,
                investmentGoalId: formData.investmentGoalId ?? null,
                notes: formData.notes || null,
              } as any)
            }
            onClose()
          }}
        >
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Nome do Investimento"
                value={formData.investimentName || ''}
                onChange={e =>
                  setFormData({ ...formData, investimentName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Input
                label="Valor"
                type="number"
                value={formData.amount ?? 0}
                onChange={e =>
                  setFormData({
                    ...formData,
                    amount: Number(e.target.value),
                  })
                }
                min={0}
                step={0.01}
                required
              />
            </div>

            <div>
              <Input
                label="Tipo"
                value={formData.investmentTypeId || ''}
                onChange={e =>
                  setFormData({ ...formData, investmentTypeId: e.target.value })
                }
                required
              />
            </div>
          </div>

          <SheetFooter className="px-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
