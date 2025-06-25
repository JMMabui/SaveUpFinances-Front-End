import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import {
  mockBudgets,
  mockCategories,
  mockTransactions,
  TransactionType,
} from '../../mocks/mockData'
import { TopNavigation } from '../../components/TopNavigation'

interface Budget {
  id: number
  categoryId: number
  month: number
  year: number
  limit: number
}

export function BudgetManagement() {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const calculateCategoryExpenses = (categoryId: number) => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    return mockTransactions
      .filter(
        t =>
          t.categoryId === categoryId &&
          t.type === TransactionType.DESPESA &&
          t.month === currentMonth &&
          t.year === currentYear
      )
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const getProgressColor = (spent: number, limit: number) => {
    const percentage = (spent / limit) * 100
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      <TopNavigation />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Orçamentos
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          Novo Orçamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map(budget => {
          const category = mockCategories.find(c => c.id === budget.categoryId)
          const spent = calculateCategoryExpenses(budget.categoryId)
          const percentage = Math.min((spent / budget.limit) * 100, 100)

          return (
            <Card key={budget.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {category?.categoryName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category?.icon} {category?.categoryType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedBudget(budget)
                        setIsModalOpen(true)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setBudgets(budgets =>
                          budgets.filter(b => b.id !== budget.id)
                        )
                      }
                    >
                      Excluir
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Limite:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Gasto:
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {formatCurrency(spent)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Restante:
                    </span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(budget.limit - spent)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(spent, budget.limit)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
            <h3 className="text-xl font-semibold mb-4">
              {selectedBudget ? 'Editar Orçamento' : 'Novo Orçamento'}
            </h3>
            <form
              onSubmit={e => {
                e.preventDefault()
              }}
            >
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Categoria
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedBudget?.categoryId || ''}
                  onChange={e => {
                    const newBudget: Budget = {
                      id: selectedBudget?.id || Date.now(),
                      categoryId: Number(e.target.value),

                      month: selectedBudget?.month || new Date().getMonth() + 1,
                      year: selectedBudget?.year || new Date().getFullYear(),
                      limit: selectedBudget?.limit || 0,
                    }
                    setSelectedBudget(newBudget)
                  }}
                >
                  <option value="">Selecione uma categoria</option>
                  {mockCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                <label className="block text-sm font-medium mt-4 mb-1">
                  Mês
                </label>

                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedBudget?.month || ''}
                  onChange={e => {
                    const newBudget: Budget = {
                      id: selectedBudget?.id || Date.now(),
                      categoryId: selectedBudget?.categoryId || 0,
                      month: Number(e.target.value),
                      year: selectedBudget?.year || new Date().getFullYear(),
                      limit: selectedBudget?.limit || 0,
                    }
                    setSelectedBudget(newBudget)
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

                <label className="block text-sm font-medium mt-4 mb-1">
                  Ano
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedBudget?.year || ''}
                  onChange={e => {
                    const newBudget: Budget = {
                      id: selectedBudget?.id || Date.now(),
                      categoryId: selectedBudget?.categoryId || 0,
                      month: selectedBudget?.month || new Date().getMonth() + 1,
                      year: Number(e.target.value),

                      limit: selectedBudget?.limit || 0,
                    }
                    setSelectedBudget(newBudget)
                  }}
                >
                  <option value="">Selecione um ano</option>
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={2025 + i}>
                      {2025 + i}
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium mt-4 mb-1">
                  Limite
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedBudget?.limit || ''}
                  onChange={e => {
                    const newBudget: Budget = {
                      id: selectedBudget?.id || Date.now(),
                      categoryId: selectedBudget?.categoryId || 0,
                      month: selectedBudget?.month || new Date().getMonth() + 1,
                      year: selectedBudget?.year || new Date().getFullYear(),
                      limit: Number(e.target.value),
                    }
                    setSelectedBudget(newBudget)
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
                  onClick={() => {
                    if (selectedBudget?.id) {
                      setBudgets(budgets =>
                        budgets.map(b =>
                          b.id === selectedBudget.id ? selectedBudget : b
                        )
                      )
                    } else if (selectedBudget) {
                      setBudgets([...budgets, selectedBudget])
                    }
                    setIsModalOpen(false)
                    setSelectedBudget(null)
                  }}
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
