import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import type { TransactionFormData } from './TransactionForm'

interface TransactionListProps {
  transactions: TransactionFormData[]
  onEdit?: (transaction: TransactionFormData) => void
  onDelete?: (transaction: TransactionFormData) => void
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date))
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
          <TableRow key={transaction.id}>
            <TableCell className="text-gray-500">
              {formatDate(transaction.date)}
            </TableCell>
            <TableCell className="text-gray-900">
              {transaction.description}
            </TableCell>
            <TableCell className="text-gray-500">
              {transaction.category}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  transaction.type === 'income' ? 'success' : 'destructive'
                }
                size="sm"
              >
                {transaction.type === 'income' ? 'Receita' : 'Despesa'}
              </Badge>
            </TableCell>
            <TableCell
              className={
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }
            >
              {formatCurrency(transaction.amount)}
            </TableCell>
            <TableCell className="text-gray-500">
              {transaction.accountType}
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
