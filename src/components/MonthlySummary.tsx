import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { useGetIncomeByUser } from '@/lib/HTTP/income';
import { useGetExpensesByUser } from '@/lib/HTTP/expenses';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  balance: number;
}

function monthLabel(date: Date) {
  return date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
}

export function MonthlySummary() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: incomeData } = useGetIncomeByUser(userId)
  const { data: expensesData } = useGetExpensesByUser(userId)

  const incomes = (incomeData?.data || []).map((i: any) => ({ ...i, date: new Date(i.date) }))
  const expenses = (expensesData?.data || []).map((e: any) => ({ ...e, date: new Date(e.date) }))

  const now = new Date()
  const months: Date[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d)
  }

  const monthlyData: MonthlyData[] = months.map((m) => {
    const month = m.getMonth()
    const year = m.getFullYear()

    const monthIncome = incomes.filter((i: any) => i.date.getMonth() === month && i.date.getFullYear() === year)
      .reduce((sum: number, i: any) => sum + (i.amount || 0), 0)

    const monthExpenses = expenses.filter((e: any) => e.date.getMonth() === month && e.date.getFullYear() === year)
      .reduce((sum: number, e: any) => sum + (e.amount || 0), 0)

    const savings = Math.max(monthIncome - monthExpenses, 0)

    return {
      month: monthLabel(m),
      income: monthIncome,
      expenses: monthExpenses,
      savings,
      balance: savings,
    }
  })

  const currentMonth = monthlyData[monthlyData.length - 1] || { income: 0, expenses: 0, savings: 0, balance: 0, month: '' }
  const previousMonth = monthlyData[monthlyData.length - 2] || { income: 0, expenses: 0, savings: 0, balance: 0, month: '' }

  const getChangePercentage = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: COLORS.blue[600] }} />
          Resumo Mensal
        </CardTitle>
        <p className="text-sm text-gray-600">
          Comparação com o mês anterior
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ backgroundColor: COLORS.green[50] }}>
              <div className="text-2xl font-bold text-gray-900">
                {currentMonth.income.toLocaleString()} Mt
              </div>
              <div className="text-sm text-gray-600">Rendimento</div>
              <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${getChangeColor(getChangePercentage(currentMonth.income, previousMonth.income))}`}>
                {getChangeIcon(getChangePercentage(currentMonth.income, previousMonth.income))}
                <span>{getChangePercentage(currentMonth.income, previousMonth.income).toFixed(1)}%</span>
              </div>
            </div>

            <div className="text-center p-3 rounded-lg" style={{ backgroundColor: COLORS.blue[50] }}>
              <div className="text-2xl font-bold text-gray-900">
                {currentMonth.expenses.toLocaleString()} Mt
              </div>
              <div className="text-sm text-gray-600">Despesas</div>
              <div className={`flex items-center justify-center gap-1 text-xs mt-1 ${getChangeColor(getChangePercentage(currentMonth.expenses, previousMonth.expenses))}`}>
                {getChangeIcon(getChangePercentage(currentMonth.expenses, previousMonth.expenses))}
                <span>{getChangePercentage(currentMonth.expenses, previousMonth.expenses).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Evolução do Saldo (6 meses)</span>
              <span className="font-medium">{currentMonth.balance.toLocaleString()} Mt</span>
            </div>
            
            <div className="relative h-32">
              <div className="absolute inset-0 flex items-end justify-between">
                {monthlyData.map((data, index) => {
                  const height = (data.balance / Math.max(...monthlyData.map(d => d.balance || 1))) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-8 rounded-t-sm transition-all duration-300 hover:opacity-80"
                        style={{
                          height: `${Math.max(height, 4)}%`,
                          backgroundColor: COLORS.green[500],
                          minHeight: '4px'
                        }}
                      />
                      <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Poupança Mensal</span>
              <span className="text-sm text-gray-600">
                {currentMonth.savings.toLocaleString()} Mt
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${currentMonth.income ? (currentMonth.savings / currentMonth.income) * 100 : 0}%`,
                  backgroundColor: COLORS.yellow[500],
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {currentMonth.income ? ((currentMonth.savings / currentMonth.income) * 100).toFixed(1) : '0.0'}% do rendimento
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
