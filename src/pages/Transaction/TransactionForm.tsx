import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAccountsByUserId } from '@/lib/HTTP/account'
import { useGetCategories } from '@/lib/HTTP/categories'

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

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
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
        id: acc.id,
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
        <Input
          label="Descrição"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Input
          label="Valor"
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min={0}
          step={0.01}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tipo
        </label>
        <Select
          value={formData.type}
          onValueChange={value =>
            setFormData(prev => ({
              ...prev,
              type: value as 'income' | 'expense',
            }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Receita</SelectItem>
            <SelectItem value="expense">Despesa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.type === 'expense' && availableAccounts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Conta para Débito
          </label>
          <Select
            value={formData.debitAccount || ''}
            onValueChange={value =>
              setFormData(prev => ({ ...prev, debitAccount: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma conta" />
            </SelectTrigger>
            <SelectContent>
              {availableAccounts.map(account => (
                <SelectItem
                  key={(account as any).id ?? account.type}
                  value={String((account as any).id ?? account.type)}
                >
                  {account.label} - MT {account.balance.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Categoria
        </label>
        <Select
          value={formData.category}
          onValueChange={value =>
            setFormData(prev => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category: any) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          label="Data"
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
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
