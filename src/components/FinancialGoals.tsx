import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: 'completed' | 'in-progress' | 'not-started';
  color: string;
}

export function FinancialGoals() {
  const goals: FinancialGoal[] = [
    {
      id: '1',
      title: 'Fundo de Emergência',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: '2024-12-31',
      status: 'in-progress',
      color: COLORS.green[500],
    },
    {
      id: '2',
      title: 'Férias no Exterior',
      targetAmount: 15000,
      currentAmount: 12000,
      deadline: '2024-06-30',
      status: 'in-progress',
      color: COLORS.blue[500],
    },
    {
      id: '3',
      title: 'Entrada para Casa',
      targetAmount: 50000,
      currentAmount: 35000,
      deadline: '2025-12-31',
      status: 'in-progress',
      color: COLORS.yellow[500],
    },
    {
      id: '4',
      title: 'Investimento em Ações',
      targetAmount: 8000,
      currentAmount: 8000,
      deadline: '2024-03-31',
      status: 'completed',
      color: COLORS.black[600],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Target className="w-5 h-5" style={{ color: COLORS.green[600] }} />
          Metas Financeiras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <div key={goal.id} className="space-y-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status === 'completed' && 'Concluído'}
                    {goal.status === 'in-progress' && 'Em Progresso'}
                    {goal.status === 'not-started' && 'Não Iniciado'}
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
                      backgroundColor: goal.color,
                    }}
                  />
                </div>
                
                {goal.status === 'in-progress' && remaining > 0 && (
                  <div className="text-xs text-gray-500">
                    Faltam {remaining.toLocaleString()} Mt para completar
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
