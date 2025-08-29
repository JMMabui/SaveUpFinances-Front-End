import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  balance: number;
}

export function MonthlySummary() {
  const monthlyData: MonthlyData[] = [
    { month: 'Jan', income: 8500, expenses: 4200, savings: 4300, balance: 15000 },
    { month: 'Fev', income: 8200, expenses: 3800, savings: 4400, balance: 19400 },
    { month: 'Mar', income: 8800, expenses: 4100, savings: 4700, balance: 24100 },
    { month: 'Abr', income: 8600, expenses: 3900, savings: 4700, balance: 28800 },
    { month: 'Mai', income: 9000, expenses: 4200, savings: 4800, balance: 33600 },
    { month: 'Jun', income: 8700, expenses: 4000, savings: 4700, balance: 38300 },
  ];

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
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
          {/* Métricas principais */}
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

          {/* Gráfico de linha simples */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Evolução do Saldo (6 meses)</span>
              <span className="font-medium">{currentMonth.balance.toLocaleString()} Mt</span>
            </div>
            
            <div className="relative h-32">
              <div className="absolute inset-0 flex items-end justify-between">
                {monthlyData.map((data, index) => {
                  const height = (data.balance / Math.max(...monthlyData.map(d => d.balance))) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-8 rounded-t-sm transition-all duration-300 hover:opacity-80"
                        style={{
                          height: `${height}%`,
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

          {/* Resumo de poupança */}
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
                  width: `${(currentMonth.savings / currentMonth.income) * 100}%`,
                  backgroundColor: COLORS.yellow[500],
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {((currentMonth.savings / currentMonth.income) * 100).toFixed(1)}% do rendimento
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
