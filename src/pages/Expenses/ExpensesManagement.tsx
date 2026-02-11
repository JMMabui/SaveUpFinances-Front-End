import { useState } from 'react'
import { ExpenseList } from '@/components/expense/ExpenseList'
import { ExpenseModal } from '@/components/expense/ExpenseModal'
import { MainLayout } from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants/colors'
import { useGetCategories } from '@/lib/HTTP/categories'
import { useDeleteExpense, useGetExpensesByUser } from '@/lib/HTTP/expenses'

export function ExpensesManagement() {
  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: expensesQuery } = useGetExpensesByUser(userId)
  const { data: categoriesQuery } = useGetCategories()
  const deleteExpense = useDeleteExpense()

  const expenses = (expensesQuery?.data || []) as any[]
  const categories = (categoriesQuery?.data || []) as any[]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null)

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.black[800] }}
          >
            Despesas
          </h2>
          <Button
            onClick={() => {
              setSelectedExpense(null)
              setIsModalOpen(true)
            }}
          >
            Nova Despesa
          </Button>
        </div>

        <ExpenseList
          expenses={expenses}
          categories={categories}
          onEdit={exp => {
            setSelectedExpense(exp)
            setIsModalOpen(true)
          }}
          onDelete={id => deleteExpense.mutate(id)}
        />

        {isModalOpen && (
          <ExpenseModal
            expense={selectedExpense}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </MainLayout>
  )
}
