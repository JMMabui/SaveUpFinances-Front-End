import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { COLORS } from '../constants/colors'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface FinancialAlert {
  id: string
  type: 'warning' | 'info' | 'success' | 'error'
  title: string
  message: string
  priority: 'high' | 'medium' | 'low'
  date: string
  actionRequired: boolean
}

export function FinancialAlerts() {
  const alerts: FinancialAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Limite do Cartão Aproximando',
      message:
        'Você já gastou 85% do limite do seu cartão de crédito este mês.',
      priority: 'high',
      date: '2024-01-15',
      actionRequired: true,
    },
    {
      id: '2',
      type: 'info',
      title: 'Meta de Poupança Atingida',
      message:
        'Parabéns! Você atingiu sua meta de poupança para o fundo de emergência.',
      priority: 'medium',
      date: '2024-01-14',
      actionRequired: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Investimento Rendendo Bem',
      message:
        'Seus investimentos renderam 12.5% este mês, acima da média esperada.',
      priority: 'low',
      date: '2024-01-13',
      actionRequired: false,
    },
    {
      id: '4',
      type: 'error',
      title: 'Conta Vencida',
      message:
        'A fatura do cartão de crédito vence em 2 dias. Evite juros e multas.',
      priority: 'high',
      date: '2024-01-12',
      actionRequired: true,
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'info':
        return 'border-l-blue-500 bg-blue-50'
      case 'success':
        return 'border-l-green-500 bg-green-50'
      case 'error':
        return 'border-l-red-500 bg-red-50'
      default:
        return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle
            className="w-5 h-5"
            style={{ color: COLORS.yellow[600] }}
          />
          Alertas Financeiros
        </CardTitle>
        <p className="text-sm text-gray-600">
          {alerts.filter(alert => alert.actionRequired).length} ação(ões)
          requerida(s)
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getAlertIcon(alert.type)}</div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {alert.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}
                      >
                        {alert.priority === 'high' && 'Alta'}
                        {alert.priority === 'medium' && 'Média'}
                        {alert.priority === 'low' && 'Baixa'}
                      </span>
                      {alert.actionRequired && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Ação Necessária
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">{alert.message}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(alert.date)}</span>
                    {alert.actionRequired && (
                      <Button className="text-blue-600 hover:text-blue-700 font-medium">
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors">
            Ver Todos os Alertas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
