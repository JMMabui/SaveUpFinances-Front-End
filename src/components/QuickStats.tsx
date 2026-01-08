import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard, AlertTriangle } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { getAccountsByUserId } from '@/lib/HTTP/account';
import { useGetIncomeByUser } from '@/lib/HTTP/income';
import { useGetExpensesByUser } from '@/lib/HTTP/expenses';
import { useGetDebtsByUser } from '@/lib/HTTP/debts';
import { useGetCreditCardsByUser } from '@/lib/HTTP/credit-card';

interface QuickStatProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const QuickStat = ({ title, value, change, changeType = 'neutral', icon, color }: QuickStatProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg`} style={{ backgroundColor: color + '20' }}>
          <div style={{ color: color }}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${getChangeColor()}`}>
            {getChangeIcon()}
            <span>{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export function QuickStats() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''

  const { data: accountsData } = getAccountsByUserId(userId)
  const { data: incomeData } = useGetIncomeByUser(userId)
  const { data: expensesData } = useGetExpensesByUser(userId)
  const { data: debtsData } = useGetDebtsByUser(userId)
  const { data: creditCardsData } = useGetCreditCardsByUser(userId)

  const accounts = accountsData?.data || []
  const totalBalance = Array.isArray(accounts)
    ? accounts.reduce((sum: number, acc: any) => sum + (acc?.balance || 0), 0)
    : 0

  const incomes = incomeData?.data || []
  const expenses = expensesData?.data || []
  const totalIncome = incomes.reduce((sum: number, i: any) => sum + (i?.amount || 0), 0)
  const totalExpenses = expenses.reduce((sum: number, e: any) => sum + (e?.amount || 0), 0)
  const savings = Math.max(totalIncome - totalExpenses, 0)

  const debts = debtsData?.data || []
  const pendingDebts = debts.filter((d: any) => d?.status === 'pending')
  const pendingDebtsAmount = pendingDebts.reduce((sum: number, d: any) => sum + (d?.amount || 0), 0)

  const creditCards = creditCardsData?.data || []

  const stats = [
    {
      title: 'Saldo Total',
      value: `${totalBalance.toLocaleString()} Mt`,
      icon: <DollarSign className="w-5 h-5" />,
      color: COLORS.green[600],
    },
    {
      title: 'Poupança (estimada)',
      value: `${savings.toLocaleString()} Mt`,
      icon: <PiggyBank className="w-5 h-5" />,
      color: COLORS.blue[600],
    },
    {
      title: 'Cartões de Crédito',
      value: `${Array.isArray(creditCards) ? creditCards.length : 0}`,
      icon: <CreditCard className="w-5 h-5" />,
      color: COLORS.yellow[600],
    },
    {
      title: 'Dívidas Pendentes',
      value: `${pendingDebtsAmount.toLocaleString()} Mt`,
      icon: <AlertTriangle className="w-5 h-5" />,
      color: COLORS.black[600],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <QuickStat key={index} {...stat} />
      ))}
    </div>
  );
}
