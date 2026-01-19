import { BudgetList } from '@/components/budget/BudgetList'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useDeleteBudget, useGetBudgetsByUser } from '@/lib/HTTP/budget'
import { useGetCategories } from '@/lib/HTTP/categories'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'

export function BudgetManagement() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: budgetsQuery } = useGetBudgetsByUser(userId)
  const { data: categoriesQuery } = useGetCategories()
  const { data: expensesQuery } = useGetExpensesByUser(userId)

  const deleteBudget = useDeleteBudget()

  const budgets = budgetsQuery?.data || []
  const categories = categoriesQuery?.data || []
  const expenses = expensesQuery?.data || []

  // removed selectedBudget state (unused)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Título + botão novo */}
        <div className="flex justify-between items-center">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.black[800] }}
          >
            Orçamentos
          </h2>
          <Button onClick={() => {}} className="flex items-center gap-2">
            Novo Orçamento
          </Button>
        </div>

        <BudgetList
          budgets={budgets}
          categories={categories}
          expenses={expenses}
          onEdit={_budget => {}}
          onDelete={id => deleteBudget.mutate(id)}
        />
      </div>
    </MainLayout>
  )
}
