import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAccountsByUserId } from '@/lib/HTTP/account'
import { useGetCategories } from '@/lib/HTTP/categories'
import type { TransactionResponse } from '@/lib/HTTP/Type/transactions.type'
import type { TransactionFormData } from './TransactionForm'

interface TransactionListProps {
  transactions: Array<TransactionFormData | TransactionResponse>
  onEdit?: (transaction: TransactionFormData | TransactionResponse) => void
  onDelete?: (transaction: TransactionFormData | TransactionResponse) => void
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: categoriesData } = useGetCategories()
  const categories = categoriesData?.data || []
  const { data: accountsData } = getAccountsByUserId(userId)
  const accounts = Array.isArray(accountsData?.data)
    ? (accountsData?.data as any[])
    : []

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(typeof date === 'string' ? new Date(date) : date)
  }

  const getCategoryName = (t: TransactionFormData | TransactionResponse) => {
    const categoryId = (t as any).categoryId ?? (t as any).category ?? ''
    return (
      categories.find((c: any) => c?.id === String(categoryId))?.categoryName ||
      'Categoria'
    )
  }

  const getAccountName = (t: TransactionFormData | TransactionResponse) => {
    const accountId = (t as any).accountId ?? ''
    const debitAccount = (t as any).debitAccount ?? ''
    let acc =
      accounts.find((a: any) => String(a?.id) === String(accountId)) || null
    if (!acc && debitAccount) {
      acc =
        accounts.find(
          (a: any) => String(a?.accountType) === String(debitAccount)
        ) || null
    }
    return acc?.accountName || debitAccount || 'Conta'
  }

  const getType = (t: TransactionFormData | TransactionResponse) => {
    const type: any = (t as any).type
    if (type === 'income' || type === 'expense') return type
    return (t as any).amount >= 0 ? 'income' : 'expense'
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Conta</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TableRow key={String((transaction as any).id)}>
            <TableCell className="text-gray-500">
              {formatDate((transaction as any).date)}
            </TableCell>
            <TableCell className="text-gray-900">
              {(transaction as any).description}
            </TableCell>
            <TableCell className="text-gray-500">
              {getCategoryName(transaction)}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  getType(transaction) === 'income' ? 'success' : 'destructive'
                }
                size="sm"
              >
                {getType(transaction) === 'income' ? 'Receita' : 'Despesa'}
              </Badge>
            </TableCell>
            <TableCell
              className={
                getType(transaction) === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {formatCurrency((transaction as any).amount)}
            </TableCell>
            <TableCell className="text-gray-500">
              {getAccountName(transaction)}
            </TableCell>
            <TableCell>
              <div className="flex justify-end space-x-2">
                {onEdit && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(transaction)}
                  >
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(transaction)}
                  >
                    Excluir
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
