import type React from 'react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { TopNavigation } from '../../components/TopNavigation'
import { mockCreditCards, mockCreditCardExpenses, mockCategories } from '../../mocks/mockData'
import { Header } from '@/components/Header'

// Hook personalizado para calcular o total de despesas
const useTotalExpenses = (expenses: CreditCardExpense[]) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

interface CreditCard {
  id: number
  name: string
  limit: number
  dueDay: number
}

interface CreditCardExpense {
  id: number
  description: string
  amount: number
  date: Date
  categoryId: number
}

export function CreditCardManagement() {
  const [creditCards, setCreditCards] = useState<CreditCard[]>(mockCreditCards)
  const [expenses, setExpenses] = useState<CreditCardExpense[]>(mockCreditCardExpenses)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null)
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] =
    useState<CreditCardExpense | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  const calculateTotalExpenses = (cardId: number) => {
    return expenses
      .filter(expense => expense.id === cardId)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }

  const handleAddCard = () => {
    setSelectedCard(null)
    setIsModalOpen(true)
  }

  const handleEditCard = (card: CreditCard) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  const handleAddExpense = (card: CreditCard) => {
    setSelectedCard(card)
    setSelectedExpense(null)
    setIsExpenseModalOpen(true)
  }

  const handleEditExpense = (card: CreditCard, expense: CreditCardExpense) => {
    setSelectedCard(card)
    setSelectedExpense(expense)
    setIsExpenseModalOpen(true)
  }

  return (
    <div className="p-4">
      {/** Menu no topo*/}
      <Header />

      {/** */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cartões de Crédito</h2>
        <Button onClick={handleAddCard} className="flex items-center gap-2">
          Novo Cartão
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creditCards.map(card => {
          const totalExpenses = calculateTotalExpenses(card.id)
          const availableLimit = card.limit - totalExpenses

          return (
            <Card key={card.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {card.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Vencimento: dia {card.dueDay}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedCard(card)
                        setIsModalOpen(true)
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setCreditCards(cards => cards.filter(c => c.id !== card.id))}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Limite Total:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(card.limit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Gastos:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {formatCurrency(totalExpenses)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Disponível:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(availableLimit)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Últimas Despesas
                  </h4>
                  <div className="space-y-2">
                    {expenses
                      .filter(expense => expense.id === card.id)
                      .slice(0, 3)
                      .map(expense => (
                        <div
                          key={expense.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <div>
                            <p className="text-gray-900 dark:text-gray-100">
                              {expense.description}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                              {formatDate(expense.date)}
                            </p>
                          </div>
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {formatCurrency(expense.amount)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {isModalOpen && (
        <CreditCardModal
          card={selectedCard}
          onClose={() => setIsModalOpen(false)}
          onSave={card => {
            // Handle save logic here
            card
            setIsModalOpen(false)
          }}
        />
      )}

      {isExpenseModalOpen && selectedCard && (
        <ExpenseModal
          card={selectedCard}
          expense={selectedExpense}
          onClose={() => setIsExpenseModalOpen(false)}
          onSave={expense => {
            // Handle save logic here
            expense
            setIsExpenseModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

interface CreditCardModalProps {
  card: CreditCard | null
  onClose: () => void
  onSave: (card: Partial<CreditCard>) => void
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({
  card,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<CreditCard>>(
    card || {
      name: '',
      limit: 0,
      dueDay: 1,
    }
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {card ? 'Editar Cartão' : 'Novo Cartão'}
        </h3>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSave(formData)
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome do Cartão
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Limite</label>
              <input
                type="number"
                value={formData.limit}
                onChange={e =>
                  setFormData({
                    ...formData,
                    limit: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Dia de Vencimento
              </label>
              <input
                type="number"
                value={formData.dueDay}
                onChange={e =>
                  setFormData({
                    ...formData,
                    dueDay: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                min="1"
                max="31"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ExpenseModalProps {
  card: CreditCard
  expense: CreditCardExpense | null
  onClose: () => void
  onSave: (expense: Partial<CreditCardExpense>) => void
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  card,
  expense,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<CreditCardExpense>>(
    expense || {
      description: '',
      amount: 0,
      date: new Date(),
      categoryId: 0,
    }
  )
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { id: 1, name: 'Alimentação' },
    { id: 2, name: 'Transporte' },
    { id: 3, name: 'Lazer' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSave(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {expense ? 'Editar Despesa' : 'Nova Despesa'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Descrição
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Valor</label>
              <input
                type="number"
                value={formData.amount}
                onChange={e =>
                  setFormData({
                    ...formData,
                    amount: Math.max(0, Number(e.target.value)),
                  })
                }
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <input
                type="date"
                value={formData?.date?.toISOString().split('T')[0]}
                onChange={e =>
                  setFormData({
                    ...formData,
                    date: new Date(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Categoria
              </label>
              <select
                value={formData.categoryId}
                onChange={e =>
                  setFormData({
                    ...formData,
                    categoryId: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
