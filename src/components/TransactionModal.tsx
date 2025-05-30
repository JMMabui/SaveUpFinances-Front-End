import { FiX } from 'react-icons/fi'
import { Button } from './Button'
import { TransactionForm } from './TransactionForm'
import type { TransactionFormData } from './TransactionForm'

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
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white/95 dark:bg-slate-800/95 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
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
