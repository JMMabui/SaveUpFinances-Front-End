import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'
import { useUpdateAccount } from '@/lib/HTTP/account'
import { useCreateTransaction } from '@/lib/HTTP/transactions'

interface TransferModalProps {
  onClose: () => void
  accounts: any[]
}

export function TransferModal({ onClose, accounts }: TransferModalProps) {
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const updateFrom = useUpdateAccount(fromId)
  const updateTo = useUpdateAccount(toId)
  const createTx = useCreateTransaction()
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

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
            Transferência entre Contas
          </SheetTitle>
        </SheetHeader>
        <form
          onSubmit={async e => {
            e.preventDefault()
            if (!fromId || !toId || !amount || fromId === toId) return
            updateFrom.mutate({ balance: undefined as any })
            updateTo.mutate({ balance: undefined as any })
            const now = new Date()
            const isoDate = now.toISOString()
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            createTx.mutate({
              userId,
              accountId: fromId,
              date: isoDate,
              description: `Transferência para ${toId}`,
              amount: -Math.abs(amount),
              categoryId: '',
              type: 'transfer',
              month,
              year,
            } as any)
            createTx.mutate({
              userId,
              accountId: toId,
              date: isoDate,
              description: `Transferência de ${fromId}`,
              amount: Math.abs(amount),
              categoryId: '',
              type: 'transfer',
              month,
              year,
            } as any)
            onClose()
          }}
        >
          <div className="space-y-4 px-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                De
              </label>
              <select
                className="w-full p-2 border rounded"
                value={fromId}
                onChange={e => setFromId(e.target.value)}
              >
                <option value="">Selecione</option>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.accountName} — {a.balance.toLocaleString()} Mt
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Para
              </label>
              <select
                className="w-full p-2 border rounded"
                value={toId}
                onChange={e => setToId(e.target.value)}
              >
                <option value="">Selecione</option>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.accountName} — {a.balance.toLocaleString()} Mt
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: COLORS.black[700] }}
              >
                Valor
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                min={0}
                step={0.01}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <SheetFooter className="px-4 mt-6">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Transferir</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
