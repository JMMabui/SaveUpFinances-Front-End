import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard, AlertTriangle } from 'lucide-react';
import { COLORS } from '../constants/colors';

interface QuickStatProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const QuickStat = ({ title, value, change, changeType, icon, color }: QuickStatProps) => {
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
        <div className={`flex items-center gap-1 text-sm ${getChangeColor()}`}>
          {getChangeIcon()}
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function QuickStats() {
  const stats = [
    {
      title: 'Saldo Total',
      value: '15,420 Mt',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-5 h-5" />,
      color: COLORS.green[600],
    },
    {
      title: 'Poupança',
      value: '8,750 Mt',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <PiggyBank className="w-5 h-5" />,
      color: COLORS.blue[600],
    },
    {
      title: 'Cartão de Crédito',
      value: '2,180 Mt',
      change: '-5.1%',
      changeType: 'negative' as const,
      icon: <CreditCard className="w-5 h-5" />,
      color: COLORS.yellow[600],
    },
    {
      title: 'Dívidas Pendentes',
      value: '1,200 Mt',
      change: '-15.3%',
      changeType: 'positive' as const,
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
