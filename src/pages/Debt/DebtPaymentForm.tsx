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

interface DebtPaymentFormProps {
  valorOriginal: number
  onSave: (data: {
    valorPago: number
    dataPagamento: string
    observacoes?: string
  }) => void
  onCancel: () => void
}

export const DebtPaymentForm: React.FC<DebtPaymentFormProps> = ({
  valorOriginal,
  onSave,
  onCancel,
}) => {
  const [valorPago, setValorPago] = useState(valorOriginal)
  const [dataPagamento, setDataPagamento] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )
  const [observacoes, setObservacoes] = useState('')
  const [touched, setTouched] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!valorPago || valorPago <= 0) return
    onSave({ valorPago, dataPagamento, observacoes })
  }

  return (
    <Sheet
      open
      onOpenChange={open => {
        if (!open) onCancel()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Registrar Pagamento</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-4">
            <div>
              <Input
                label="Valor pago *"
                type="number"
                value={valorPago}
                onChange={e => setValorPago(Number(e.target.value))}
                min={1}
                max={valorOriginal}
                required
                error={
                  touched && (!valorPago || valorPago <= 0)
                    ? 'Informe um valor válido'
                    : undefined
                }
              />
            </div>
            <div>
              <Input
                label="Data do pagamento *"
                type="date"
                value={dataPagamento}
                onChange={e => setDataPagamento(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Observações</label>
              <textarea
                className="border rounded px-3 py-2 w-full"
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Opcional"
              />
            </div>
          </div>
          <SheetFooter className="px-4 mt-4">
            <Button type="submit">Salvar</Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
