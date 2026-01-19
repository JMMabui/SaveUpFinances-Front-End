import { useState } from 'react'
import { FiCreditCard, FiDollarSign, FiPieChart, FiPlus } from 'react-icons/fi'
import type { accountResponse } from '@/lib/HTTP/Type/account.type'
import { AccountModal } from '../AccountModal'
import { Button } from '../ui/button'

interface AsideProps {
  accounts: accountResponse[]
  totalBalance: number
}

const accountTypes = [
  { value: 'CORRENTE', icon: FiCreditCard, label: 'Conta à Ordem' },
  { value: 'POUPANCA', icon: FiPieChart, label: 'Poupança' },
  { value: 'SALARIO', icon: FiDollarSign, label: 'Conta Salário' },
  { value: 'CARTEIRA_MOVEL', icon: FiDollarSign, label: 'Carteira Móvel' },
]

export function Aside({ accounts, totalBalance }: AsideProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Contas
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
          size="sm"
        >
          <FiPlus />
          Nova
        </Button>
      </div>

      <div className="space-y-2">
        {accounts.map(acc => {
          const Icon =
            accountTypes.find(t => t.value === acc.accountType)?.icon ||
            FiCreditCard
          return (
            <div
              key={acc.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className="text-slate-500 dark:text-slate-400"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {acc.accountName}
                </span>
              </div>
              <span className="font-bold text-emerald-500">
                {formatCurrency(acc.balance)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Total:{' '}
          </span>
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(totalBalance)}
          </span>
        </h3>
      </div>

      {isModalOpen && (
        <AccountModal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            // Handle save logic here
            setIsModalOpen(false)
          }}
        />
      )}
    </aside>
  )
}
