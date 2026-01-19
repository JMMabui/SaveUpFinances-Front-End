import { FiX } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      />

      <div
        className="fixed right-0 top-0 h-full w-full max-w-md shadow-lg backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: COLORS.black[200] }}
        >
          <h3
            className="text-lg font-bold"
            style={{ color: COLORS.black[800] }}
          >
            {mode === 'add' ? 'Adicionar Transação' : 'Editar Transação'}
          </h3>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="p-2"
          >
            <FiX size={24} />
          </Button>
        </div>

        <div className="p-4">
          <TransactionForm
            initialData={transaction}
            onSubmit={onSave}
            onCancel={onClose}
            accounts={accounts}
          />
        </div>
      </div>
    </div>
  )
}
