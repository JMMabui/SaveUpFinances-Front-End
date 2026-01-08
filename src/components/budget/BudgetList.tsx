import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'

interface BudgetListProps {
  budgets: any[]
  categories: any[]
  expenses: any[]
  onEdit: (budget: any) => void
  onDelete: (id: string) => void
}

export function BudgetList({ budgets, categories, expenses, onEdit, onDelete }: BudgetListProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const calculateCategoryExpenses = (categoryId: string, month: number, year: number) =>
    expenses
      .filter((t: any) => {
        const d = new Date(t.date)
        return t.categoryId === categoryId && d.getMonth() + 1 === month && d.getFullYear() === year
      })
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0)

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = limit ? (spent / limit) * 100 : 0
    if (percentage >= 100) return COLORS.black[600]
    if (percentage >= 80) return COLORS.yellow[600]
    return COLORS.green[600]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgets.map((budget: any) => {
        const category = categories.find((c: any) => c.id === budget.categoryId)
        const spent = calculateCategoryExpenses(budget.categoryId, budget.month, budget.year)
        const percentage = Math.min(budget.limit ? (spent / budget.limit) * 100 : 0, 100)

        return (
          <Card key={budget.id} className="border" style={{ borderColor: COLORS.blue[100] }}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.black[800] }}>
                    {category?.categoryName || 'Categoria'}
                  </h3>
                  <p className="text-sm" style={{ color: COLORS.black[500] }}>
                    {budget.month}/{budget.year}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(budget)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(budget.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>

              {/* Infos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[500] }}>Limite:</span>
                  <span className="font-medium" style={{ color: COLORS.black[800] }}>
                    {formatCurrency(budget.limit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[500] }}>Gasto:</span>
                  <span className="font-medium" style={{ color: COLORS.yellow[700] }}>
                    {formatCurrency(spent)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: COLORS.black[500] }}>Restante:</span>
                  <span className="font-medium" style={{ color: COLORS.green[700] }}>
                    {formatCurrency(budget.limit - spent)}
                  </span>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mt-4">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.black[200] }}>
                  <div
                    className="h-full"
                    style={{ width: `${percentage}%`, backgroundColor: getProgressColor(spent, budget.limit) }}
                  />
                </div>
                <p className="text-sm mt-1" style={{ color: COLORS.black[500] }}>
                  {percentage.toFixed(1)}% do orçamento utilizado
                </p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}