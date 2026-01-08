import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useGetCategories, useGetCategoriesByType } from '@/lib/HTTP/categories'
import { getAccountsByUserId } from '@/lib/HTTP/account'

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void
  initialData?: TransactionFormData
  onCancel?: () => void
  accounts?: Array<{
    label: string
    type: string
    balance: number
  }>
}

export interface TransactionFormData {
  id?: number
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  month: number
  accountType: string
  userId?: number
  debitAccount?: string
}

export function TransactionForm({
  onSubmit,
  initialData,
  onCancel,
  accounts = [],
}: TransactionFormProps) {
  const [formData, setFormData] = useState<TransactionFormData>(
    initialData || {
      description: '',
      amount: 0,
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      month: new Date().getMonth(),
      accountType: 'ordem',
      debitAccount: '',
    }
  )

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: categoriesAll } = useGetCategories()
  const categories = categoriesAll?.data || []

  const filteredCategories = useMemo(() => {
    return categories
      .filter((c: any) => c?.categoryType === formData.type)
      .map((c: any) => ({ id: c.id, label: c.categoryName }))
  }, [categories, formData.type])

  const { data: accountsApi } = getAccountsByUserId(userId)
  const accountsFromApi = Array.isArray(accountsApi?.data)
    ? (accountsApi?.data as any[]).map(acc => ({
        label: acc.accountName,
        type: acc.accountType,
        balance: acc.balance,
      }))
    : []

  const availableAccounts = accounts.length ? accounts : accountsFromApi

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number.parseFloat(value) || 0 : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Descrição
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Valor
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Tipo
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </div>

      {formData.type === 'expense' && availableAccounts.length > 0 && (
        <div>
          <label
            htmlFor="debitAccount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Conta para Débito
          </label>
          <select
            id="debitAccount"
            name="debitAccount"
            value={formData.debitAccount}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Selecione uma conta</option>
            {availableAccounts.map(account => (
              <option key={account.type} value={account.type}>
                {account.label} - MT {account.balance.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Categoria
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Selecione uma categoria</option>
          {filteredCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Data
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit">{initialData ? 'Atualizar' : 'Adicionar'}</Button>
      </div>
    </form>
  )
}
