import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { useGetTransactionsByUser } from '@/lib/HTTP/transactions';
import { useGetCategories } from '@/lib/HTTP/categories';

export function RecentTransactions() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data: transactionsData } = useGetTransactionsByUser(userId)
  const { data: categoriesData } = useGetCategories()

  const transactions = (transactionsData?.data || []).slice(0, 8)
  const categories = categoriesData?.data || []

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const getCategoryColor = (categoryId: string) => {
    const idx = categories.findIndex((c: any) => c?.id === categoryId)
    const palette = [COLORS.green[500], COLORS.blue[500], COLORS.yellow[500], COLORS.black[600], COLORS.green[400], COLORS.yellow[600]]
    return palette[idx >= 0 ? idx % palette.length : 0]
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c: any) => c?.id === categoryId)?.categoryName || 'Categoria'
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction: any) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.amount >= 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  {transaction.amount >= 0 ? (
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
                      style={{ backgroundColor: getCategoryColor(transaction.categoryId) }}
                    >
                      {getCategoryName(transaction.categoryId)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(transaction.date as string)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold text-sm ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount >= 0 ? '+' : '-'}
                  {Math.abs(transaction.amount).toLocaleString()} Mt
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
