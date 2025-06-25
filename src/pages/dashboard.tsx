import { useState } from 'react'
import { Header } from '../components/Header'
import { Aside } from '../components/Aside'
import { TopNavigation } from '../components/TopNavigation'
import { MonthlyChart } from '../components/MonthlyChart'
import { TransactionList } from './Transaction/TransactionList'
import { TransactionModal } from './Transaction/TransactionModal'
import { TransactionFilters } from './Transaction/TransactionFilters'
import { FinancialSummary } from '../components/FinancialSummary'
import { Button } from '../components/Button'
import { FiPlus } from 'react-icons/fi'
import { useMockData } from '../hooks/useMockData'
import type { TransactionFormData } from './Transaction/TransactionForm'
import {TransactionType, mockTransactions, mockAccounts, mockCategories, mockDebts } from '../mocks/mockData'
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

export interface DashboardProps {
  userId: number
  onLogout: () => void
}

export function Dashboard({ userId, onLogout }: DashboardProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all')
  const [selectedAccount, setSelectedAccount] = useState<string>('all')
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<TransactionFormData | undefined>()

  const [transactions, setTransactions] = useState(mockTransactions);
const [accounts] = useState(mockAccounts);
const [categories] = useState(mockCategories);
const [debts] = useState(mockDebts);

  const {
   
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByType,
    calculateMonthlyTotals,
    calculateTotalBalance
  } = useMockData()

  const handleToggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const handleSave = (data: TransactionFormData) => {
    if (editingTransaction?.id) {
      // Atualizar transação existente
      const updatedTransactions = transactions.map(t =>
        t.id === editingTransaction.id ? { ...t, ...data } : t
      )
      // Aqui você atualizaria o estado com as transações atualizadas
    } else {
      // Adicionar nova transação
      const newTransaction = {
        ...data,
        id: transactions.length + 1,
        date: new Date(data.date),
        month: new Date(data.date).getMonth() + 1,
        year: new Date(data.date).getFullYear(),
        userId: String(userId),
        accountId: Number(data.accountType),
        categoryId: Number(data.category),
        createdAt: new Date(),
        updatedAt: new Date(),
        type: data.type === 'income' ? TransactionType.RECEITA : TransactionType.DESPESA
      }
      // Aqui você adicionaria a nova transação ao estado
      addTransaction(newTransaction)
    }
    setIsModalOpen(false)
    setEditingTransaction(undefined)
  }

  const handleDelete = (transaction: TransactionFormData) => {
    // Aqui você removeria a transação do estado
    if (transaction.id) {
      deleteTransaction(transaction.id)
    }
  }

  const filteredTransactions = transactions.filter(t => {
    const matchesType = selectedType === 'all' || 
      (selectedType === 'income' && t.type === TransactionType.RECEITA) ||
      (selectedType === 'expense' && t.type === TransactionType.DESPESA)
    const matchesAccount = selectedAccount === 'all' || 
      t.accountId.toString() === selectedAccount
    const matchesDateRange =
      !dateRange.start ||
      !dateRange.end ||
      (new Date(t.date) >= new Date(dateRange.start) && 
       new Date(t.date) <= new Date(dateRange.end))

    return matchesType && matchesAccount && matchesDateRange
  })

  const monthlyTotals = calculateMonthlyTotals()
  const totalBalance = calculateTotalBalance()

  const totalDividas = debts.reduce((acc, d) => acc + d.valor, 0);
const totalDividasPagas = debts.filter(d => d.status === 'paga').reduce((acc, d) => acc + d.valor, 0);
const totalDividasPendentes = debts.filter(d => d.status === 'pendente').reduce((acc, d) => acc + d.valor, 0);
const qtdPagas = debts.filter(d => d.status === 'paga').length;
const qtdPendentes = debts.filter(d => d.status === 'pendente').length;
const pieData = {
  labels: ['Pagas', 'Pendentes'],
  datasets: [
    {
      data: [qtdPagas, qtdPendentes],
      backgroundColor: ['#22c55e', '#f59e42'],
      borderWidth: 1,
    },
  ],
};
const proximasDividas = debts
  .filter(d => d.status === 'pendente')
  .sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime())
  .slice(0, 3);

  return (
    <div className={`${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
      <Header
        user={{
          id: userId,
          name: 'Usuário',
          email: 'usuario@email.com',
        }}
        onLogout={onLogout}
        onToggleTheme={handleToggleTheme}
        theme={theme}
      />
      <TopNavigation />

      <div className="flex min-h-[calc(100vh-64px)]">
        <Aside
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          accounts={accounts.map(acc => ({
            id: acc.id,
            name: acc.accountName,
            type: acc.accountType,
            balance: acc.balance
          }))}
          totalBalance={totalBalance}
        />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
              </h1>
              <Button onClick={() => {
                setIsModalOpen(true)
                setEditingTransaction(undefined)
              }} className="flex items-center gap-2">
                <FiPlus />
                Nova Transação
              </Button>
            </div>

            <FinancialSummary
              transactions={filteredTransactions.map(t => ({
                ...t,
                category: categories.find(c => c.id === t.categoryId)?.categoryName || '',
                accountType: accounts.find(a => a.id === t.accountId)?.accountName || '',
                type: t.type === TransactionType.RECEITA ? 'income' : 'expense',
                date: t.date.toISOString(),
                userId: Number(t.userId)
              }))}
              period={dateRange}
              monthlyTotals={monthlyTotals}
              totalBalance={totalBalance}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Transações
                  </h2>
                  <TransactionFilters
                    selectedType={selectedType}
                    selectedAccount={selectedAccount}
                    onTypeChange={setSelectedType}
                    onAccountChange={setSelectedAccount}
                    onDateRangeChange={setDateRange}
                    accounts={accounts.map(acc => acc.accountName)}
                  />
                  <div className="mt-6">
                    <TransactionList
                      transactions={filteredTransactions.map(t => ({
                        ...t,
                        category: categories.find(c => c.id === t.categoryId)?.categoryName || '',
                        accountType: accounts.find(a => a.id === t.accountId)?.accountName || '',
                        type: t.type === TransactionType.RECEITA ? 'income' : 'expense',
                        date: t.date.toISOString(),
                        userId: Number(t.userId)
                      }))}
                      onEdit={setEditingTransaction}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Dívidas</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div>
                      <div>Total: <b className="text-orange-700">{totalDividas}</b></div>
                      <div>Pagas: <b className="text-green-600">{totalDividasPagas}</b></div>
                      <div>Pendentes: <b className="text-orange-600">{totalDividasPendentes}</b></div>
                    </div>
                    <div className="w-32 h-32">
                      <Pie data={pieData} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Próximas a vencer</h4>
                    <ul className="space-y-1">
                      {proximasDividas.map(divida => (
                        <li key={divida.id} className="flex justify-between text-sm">
                          <span>{divida.descricao}</span>
                          <span className="text-orange-700">{new Date(divida.dataVencimento).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Gráfico Mensal
                  </h2>
                  <MonthlyChart
                    transactions={filteredTransactions.map(t => ({
                      ...t,
                      type: t.type === TransactionType.RECEITA ? 'income' : 
                            t.type === TransactionType.DESPESA ? 'expense' : 'investment'
                    }))}
                    filter={selectedType}
                    month={new Date().getMonth() + 1}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTransaction(undefined)
        }}
        mode={editingTransaction ? 'edit' : 'add'}
        transaction={editingTransaction}
        onSave={handleSave}
        accounts={accounts.map(acc => ({
          label: acc.accountName,
          type: acc.accountType,
          balance: acc.balance
        }))}
        categories={categories}
      />
    </div>
  )
}
