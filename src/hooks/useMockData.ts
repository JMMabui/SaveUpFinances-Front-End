import { useState, useCallback } from 'react'
import {
  mockTransactions,
  mockCategories,
  mockAccounts,
  mockUser,
  mockCreditCards,
  mockBudgets,
  generateMockTransactions,
  calculateTotalBalance,
  calculateMonthlyTotals,
  type AccountType,
  type TransactionType
} from '../mocks/mockData'

export function useMockData() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [accounts, setAccounts] = useState(mockAccounts)
  const [budgets, setBudgets] = useState(mockBudgets)

  const addTransaction = useCallback((newTransaction: typeof mockTransactions[0]) => {
    setTransactions(prev => [...prev, { ...newTransaction, id: prev.length + 1 }])
  }, [])

  const updateTransaction = useCallback((id: number, data: Partial<typeof mockTransactions[0]>) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id ? { ...transaction, ...data } : transaction
      )
    )
  }, [])

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id))
  }, [])

  const getTransactionsByMonth = useCallback((month: number, year: number) => {
    return transactions.filter(
      transaction => transaction.month === month && transaction.year === year
    )
  }, [transactions])

  const getTransactionsByCategory = useCallback((categoryId: number) => {
    return transactions.filter(transaction => transaction.categoryId === categoryId)
  }, [transactions])

  const getTransactionsByType = useCallback((type: TransactionType) => {
    return transactions.filter(transaction => transaction.type === type)
  }, [transactions])

  const getAccountBalance = useCallback((accountId: number) => {
    const account = accounts.find(acc => acc.id === accountId)
    return account?.balance || 0
  }, [accounts])

  const updateAccountBalance = useCallback((accountId: number, newBalance: number) => {
    setAccounts(prev => 
      prev.map(account => 
        account.id === accountId ? { ...account, balance: newBalance } : account
      )
    )
  }, [])

  const getBudgetByCategory = useCallback((categoryId: number) => {
    return budgets.find(budget => budget.categoryId === categoryId)
  }, [budgets])

  const updateBudget = useCallback((categoryId: number, newLimit: number) => {
    setBudgets(prev => 
      prev.map(budget => 
        budget.categoryId === categoryId ? { ...budget, limit: newLimit } : budget
      )
    )
  }, [])

  return {
    user: mockUser,
    categories: mockCategories,
    creditCards: mockCreditCards,
    transactions,
    accounts,
    budgets,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByMonth,
    getTransactionsByCategory,
    getTransactionsByType,
    getAccountBalance,
    updateAccountBalance,
    getBudgetByCategory,
    updateBudget,
    calculateTotalBalance,
    calculateMonthlyTotals,
    generateMockTransactions
  }
} 