import { useMemo, useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useGetBudgetsByUser, useCreateBudget, useUpdateBudget, useDeleteBudget } from '@/HTTP/budget'
import { useGetCategories } from '@/HTTP/categories'
import { useGetExpensesByUser } from '@/HTTP/expenses'
import { COLORS } from '@/constants/colors'

interface BudgetFormState {
  id?: string
  categoryId: string
  month: number
  year: number
  limit: number
}

export function BudgetManagement() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: budgetsQuery } = useGetBudgetsByUser(userId)
  const { data: categoriesQuery } = useGetCategories()
  const { data: expensesQuery } = useGetExpensesByUser(userId)

  const createBudget = useCreateBudget()
  const updateBudget = useUpdateBudget('')
  const deleteBudget = useDeleteBudget()

  const budgets = budgetsQuery?.data || []
  const categories = categoriesQuery?.data || []
  const expenses = expensesQuery?.data || []

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<BudgetFormState | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const calculateCategoryExpenses = (categoryId: string, month: number, year: number) => {
    return expenses
      .filter((t: any) => {
        const d = new Date(t.date)
        return (
          t.categoryId === categoryId &&
          d.getMonth() + 1 === month &&
          d.getFullYear() === year
        )
      })
      .reduce((sum: number, t: any) => sum + (t.amount || 0), 0)
  }

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = limit ? (spent / limit) * 100 : 0
    if (percentage >= 100) return COLORS.black[600]
    if (percentage >= 80) return COLORS.yellow[600]
    return COLORS.green[600]
  }

  return (
    <div className="space-y-6">
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
          Orçamentos
        </h2>
        <Button
          onClick={() => {
            setSelectedBudget({
              categoryId: '',
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              limit: 0,
            })
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2"
        >
          Novo Orçamento
        </Button>
      </div>

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
                      onClick={() => {
                        setSelectedBudget({
                          id: budget.id,
                          categoryId: budget.categoryId,
                          month: budget.month,
                          year: budget.year,
                          limit: budget.limit,
                        })
                        setIsModalOpen(true)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteBudget.mutate(budget.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: COLORS.black[500] }}>
                      Limite:
                    </span>
                    <span className="font-medium" style={{ color: COLORS.black[800] }}>
                      {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: COLORS.black[500] }}>
                      Gasto:
                    </span>
                    <span className="font-medium" style={{ color: COLORS.yellow[700] }}>
                      {formatCurrency(spent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: COLORS.black[500] }}>
                      Restante:
                    </span>
                    <span className="font-medium" style={{ color: COLORS.green[700] }}>
                      {formatCurrency(budget.limit - spent)}
                    </span>
                  </div>
                </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.black[800] }}>
              {selectedBudget?.id ? 'Editar Orçamento' : 'Novo Orçamento'}
            </h3>
            <form
              onSubmit={e => {
                e.preventDefault()
                if (!selectedBudget) return
                if (selectedBudget.id) {
                  updateBudget.mutate({
                    ...(selectedBudget as any),
                  })
                } else {
                  createBudget.mutate({
                    userId,
                    categoryId: selectedBudget.categoryId,
                    month: selectedBudget.month,
                    year: selectedBudget.year,
                    limit: selectedBudget.limit,
                  } as any)
                }
                setIsModalOpen(false)
                setSelectedBudget(null)
              }}
            >
              <div className="">
                <label className="block text-sm font-medium mb-1" style={{ color: COLORS.black[700] }}>
                  Categoria
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedBudget?.categoryId || ''}
                  onChange={e => {
                    setSelectedBudget(prev => prev ? { ...prev, categoryId: e.target.value } : prev)
                  }}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
                  Mês
                </label>

                <select
                  className="w-full p-2 border rounded"
                  value={selectedBudget?.month || ''}
                  onChange={e => {
                    const val = Number(e.target.value)
                    setSelectedBudget(prev => prev ? { ...prev, month: val } : prev)
                  }}
                >
                  <option value="">Selecione um mês</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {new Date(0, i).toLocaleString('default', {
                        month: 'long',
                      })}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
                  Ano
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedBudget?.year || ''}
                  onChange={e => {
                    const val = Number(e.target.value)
                    setSelectedBudget(prev => prev ? { ...prev, year: val } : prev)
                  }}
                >
                  <option value="">Selecione um ano</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={2020 + i}>
                      {2020 + i}
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium mt-4 mb-1" style={{ color: COLORS.black[700] }}>
                  Limite
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={selectedBudget?.limit ?? ''}
                  onChange={e => {
                    const val = Number(e.target.value)
                    setSelectedBudget(prev => prev ? { ...prev, limit: val } : prev)
                  }}
                  placeholder="Defina o limite do orçamento"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsModalOpen(false)
                    setSelectedBudget(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="ml-2"
                >
                  {selectedBudget?.id ? 'Salvar' : 'Criar Orçamento'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
