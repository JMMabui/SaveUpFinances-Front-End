import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  color: string;
}

export function RecentTransactions() {
  const transactions: Transaction[] = [
    {
      id: '1',
      description: 'Salário Mensal',
      amount: 8500,
      type: 'income',
      category: 'Rendimento',
      date: '2024-01-15',
      color: COLORS.green[500],
    },
    {
      id: '2',
      description: 'Supermercado',
      amount: 320,
      type: 'expense',
      category: 'Alimentação',
      date: '2024-01-14',
      color: COLORS.blue[500],
    },
    {
      id: '3',
      description: 'Combustível',
      amount: 180,
      type: 'expense',
      category: 'Transporte',
      date: '2024-01-13',
      color: COLORS.yellow[500],
    },
    {
      id: '4',
      description: 'Freelance Design',
      amount: 1200,
      type: 'income',
      category: 'Rendimento Extra',
      date: '2024-01-12',
      color: COLORS.green[400],
    },
    {
      id: '5',
      description: 'Restaurante',
      amount: 85,
      type: 'expense',
      category: 'Alimentação',
      date: '2024-01-11',
      color: COLORS.blue[500],
    },
    {
      id: '6',
      description: 'Netflix',
      amount: 45,
      type: 'expense',
      category: 'Entretenimento',
      date: '2024-01-10',
      color: COLORS.yellow[400],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'Alimentação': COLORS.green[500],
      'Transporte': COLORS.blue[500],
      'Entretenimento': COLORS.yellow[500],
      'Rendimento': COLORS.green[600],
      'Rendimento Extra': COLORS.green[400],
      'Moradia': COLORS.black[600],
      'Saúde': COLORS.blue[400],
      'Educação': COLORS.yellow[600],
    };
    return categoryColors[category] || COLORS.black[500];
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 text-sm">
                    {transaction.description}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: getCategoryColor(transaction.category) }}
                    >
                      {transaction.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold text-sm ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toLocaleString()} Mt
                </span>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
            Ver Todas as Transações
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
