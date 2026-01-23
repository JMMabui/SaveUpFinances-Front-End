import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COLORS } from '@/constants/colors'

interface Expense {
  id: string
  date: string
  description: string
  amount: number
  categoryId: string
}

interface Category {
  id: string
  categoryName: string
}

interface ExpenseListProps {
  expenses: Expense[]
  categories: Category[]
  onEdit: (expense: Expense) => void
  onDelete?: (id: string) => void
}

export function ExpenseList({
  expenses,
  categories,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  const getCategoryName = (id: string) =>
    categories.find(c => String(c.id) === String(id))?.categoryName ||
    'Categoria'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {expenses.map(expense => (
        <Card
          key={expense.id}
          className="p-4 border"
          style={{ borderColor: COLORS.blue[100] }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3
                className="font-semibold"
                style={{ color: COLORS.black[800] }}
              >
                {expense.description}
              </h3>
              <p className="text-sm" style={{ color: COLORS.black[600] }}>
                {new Date(expense.date).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm" style={{ color: COLORS.black[600] }}>
                {getCategoryName(expense.categoryId)}
              </p>
              <p className="mt-2 font-semibold" style={{ color: '#ef4444' }}>
                {expense.amount.toLocaleString()} Mt
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(expense)}
              >
                Editar
              </Button>
              {onDelete && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                >
                  Excluir
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
