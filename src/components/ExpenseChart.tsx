import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { COLORS } from '../constants/colors';

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export function ExpenseChart() {
  const categories: ExpenseCategory[] = [
    { name: 'Alimentação', amount: 450, percentage: 30, color: COLORS.green[500] },
    { name: 'Transporte', amount: 300, percentage: 20, color: COLORS.blue[500] },
    { name: 'Entretenimento', amount: 225, percentage: 15, color: COLORS.yellow[500] },
    { name: 'Moradia', amount: 375, percentage: 25, color: COLORS.black[600] },
    { name: 'Outros', amount: 150, percentage: 10, color: COLORS.green[300] },
  ];

  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Despesas por Categoria
        </CardTitle>
        <p className="text-sm text-gray-600">
          Total: {totalExpenses} Mt
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico de barras */}
          <div className="space-y-3">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <span className="text-gray-600">{category.amount} Mt</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {category.percentage}% do total
                </div>
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-600">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
