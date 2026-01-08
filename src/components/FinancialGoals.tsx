import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { useGetInvestmentGoalsByUser } from '@/lib/HTTP/investment-goal';

export function FinancialGoals() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') || '' : ''
  const { data } = useGetInvestmentGoalsByUser(userId)
  const goals = data?.data || []

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: COLORS.green[600] }} />
          Metas Financeiras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal: any) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="space-y-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{goal.name}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${progress >= 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {progress >= 100 ? 'Concluído' : 'Em Progresso'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {goal.currentAmount.toLocaleString()} Mt / {goal.targetAmount.toLocaleString()} Mt
                  </span>
                  <span className="font-medium text-gray-900">{Math.round(progress)}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: COLORS.blue[500],
                    }}
                  />
                </div>
                
                {progress < 100 && remaining > 0 && (
                  <div className="text-xs text-gray-500">
                    Faltam {remaining.toLocaleString()} Mt para completar
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Prazo: {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
