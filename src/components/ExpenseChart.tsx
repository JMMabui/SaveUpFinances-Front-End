import { useGetCategories } from '@/lib/HTTP/categories'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { COLORS } from '../constants/colors'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ExpenseCategoryAgg {
  name: string
  amount: number
  percentage: number
  color: string
}

export function ExpenseChart() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: expensesData } = useGetExpensesByUser(userId)
  const { data: categoriesData } = useGetCategories()

  const expenses = expensesData?.data || []
  const categories = categoriesData?.data || []

  const totalExpenses = expenses.reduce(
    (sum: number, e: any) => sum + (e?.amount || 0),
    0
  )

  const categoryMap = new Map<string, { name: string; amount: number }>()
  for (const e of expenses) {
    const cat = categories.find((c: any) => c?.id === e?.categoryId)
    const key = cat?.id || e?.categoryId || 'outros'
    const name = cat?.categoryName || 'Outros'
    const prev = categoryMap.get(key)?.amount || 0
    categoryMap.set(key, { name, amount: prev + (e?.amount || 0) })
  }

  const palette = [
    COLORS.green[500],
    COLORS.blue[500],
    COLORS.yellow[500],
    COLORS.black[600],
    COLORS.green[300],
  ]

  const categoriesAgg: ExpenseCategoryAgg[] = Array.from(
    categoryMap.values()
  ).map((v, idx) => ({
    name: v.name,
    amount: v.amount,
    percentage: totalExpenses
      ? Math.round((v.amount / totalExpenses) * 100)
      : 0,
    color: palette[idx % palette.length],
  }))

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Despesas por Categoria
        </CardTitle>
        <p className="text-sm text-gray-600">
          Total: {totalExpenses.toLocaleString()} Mt
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            {categoriesAgg.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-gray-600">
                    {category.amount.toLocaleString()} Mt
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {category.percentage}% do total
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categoriesAgg.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
