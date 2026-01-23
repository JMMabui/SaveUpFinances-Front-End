import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { COLORS } from '@/constants/colors'
import type { TransactionFormData } from './TransactionForm'
import { TransactionForm } from './TransactionForm'

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  transaction?: TransactionFormData
  onSave: (data: TransactionFormData) => void
  accounts: Array<{
    label: string
    type: string
    balance: number
  }>
  categories: Array<{
    id: number
    categoryName: string
    categoryType: string
    icon: string
    color: string
  }>
}

export function TransactionModal({
  isOpen,
  onClose,
  mode,
  transaction,
  onSave,
  accounts,
}: TransactionModalProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => {
        if (!open) onClose()
      }}
    >
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle style={{ color: COLORS.black[800] }}>
            {mode === 'add' ? 'Adicionar Transação' : 'Editar Transação'}
          </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <TransactionForm
            initialData={transaction}
            onSubmit={onSave}
            onCancel={onClose}
            accounts={accounts}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
