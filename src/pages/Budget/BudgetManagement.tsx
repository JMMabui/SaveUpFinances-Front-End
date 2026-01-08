import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/mainLayout'
import { useGetBudgetsByUser, useCreateBudget, useUpdateBudget, useDeleteBudget } from '@/lib/HTTP/budget'
import { useGetCategories } from '@/lib/HTTP/categories'
import { useGetExpensesByUser } from '@/lib/HTTP/expenses'
import { COLORS } from '@/constants/colors'
import { BudgetList } from '@/components/budget/BudgetList'
import { BudgetModal } from '@/components/budget/BudgetModal'

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

  const { register, handleSubmit, reset } = useForm<BudgetFormState>({
    defaultValues: {
      categoryId: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      limit: 0,
    }
  })

  // Quando abrir o modal, atualiza os valores
  useEffect(() => {
    if (selectedBudget) {
      reset(selectedBudget)
    } else {
      reset({
        categoryId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        limit: 0,
      })
    }
  }, [selectedBudget, reset])

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

  const onSubmit = (data: BudgetFormState) => {
    console.log("dados do budget", data)
    if (selectedBudget?.id) {
      updateBudget.mutate({ ...data, id: selectedBudget.id })
    } else {
      createBudget.mutate({ ...data, userId })
    }
    setIsModalOpen(false)
    setSelectedBudget(null)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Título + botão novo */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.black[800] }}>
            Orçamentos
          </h2>
          <Button
            onClick={() => {
              setSelectedBudget(null)
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2"
          >
            Novo Orçamento
          </Button>
        </div>

        <BudgetList
          budgets={budgets}
          categories={categories}
          expenses={expenses}
          onEdit={(budget) => {
            setSelectedBudget(budget)
            setIsModalOpen(true)
          }}
          onDelete={(id) => deleteBudget.mutate(id)}
        />
      </div>
    </MainLayout>
  )
}
