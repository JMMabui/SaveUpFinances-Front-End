import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApi } from '@/hooks/useApi'
import { notificationsService } from '@/lib/apiServices'

interface NotificationSettingsProps {
  onClose: () => void
}

const NotificationSettings = ({ onClose }: NotificationSettingsProps) => {
  const { execute, loading } = useApi()
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    notifyExpenses: true,
    notifyIncomes: false,
    notifyDebts: true,
    notifyBudgetAlerts: true,
    notifyInvestmentAlerts: true,
    notifyAccountTransfers: true,
    dailyDigest: false,
    digestTime: '09:00',
  })
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const response = await execute(() =>
        notificationsService.getPreferences()
      )
      if (response?.data) {
        setPreferences(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar preferências:', error)
    }
  }

  const handleChange = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await execute(() => notificationsService.updatePreferences(preferences))
      setMessage({
        type: 'success',
        text: 'Preferências atualizadas com sucesso!',
      })
      setTimeout(() => {
        setMessage(null)
        onClose()
      }, 2000)
    } catch (_error) {
      setMessage({ type: 'error', text: 'Erro ao atualizar preferências' })
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">
        Preferências de Notificação
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Notification Channels */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-3">Canais de Notificação</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="email"
                checked={preferences.emailNotifications}
                onChange={e =>
                  handleChange('emailNotifications', e.target.checked)
                }
                className="rounded"
              />
              <label htmlFor="email" className="text-sm">
                Notificações por Email
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="inApp"
                checked={preferences.inAppNotifications}
                onChange={e =>
                  handleChange('inAppNotifications', e.target.checked)
                }
                className="rounded"
              />
              <label htmlFor="inApp" className="text-sm">
                Notificações no Aplicativo
              </label>
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-3">Tipos de Notificação</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="expenses"
                checked={preferences.notifyExpenses}
                onChange={e => handleChange('notifyExpenses', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="expenses" className="text-sm">
                Despesas
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="incomes"
                checked={preferences.notifyIncomes}
                onChange={e => handleChange('notifyIncomes', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="incomes" className="text-sm">
                Rendas
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="debts"
                checked={preferences.notifyDebts}
                onChange={e => handleChange('notifyDebts', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="debts" className="text-sm">
                Dívidas
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="budgets"
                checked={preferences.notifyBudgetAlerts}
                onChange={e =>
                  handleChange('notifyBudgetAlerts', e.target.checked)
                }
                className="rounded"
              />
              <label htmlFor="budgets" className="text-sm">
                Alertas de Orçamento
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="investments"
                checked={preferences.notifyInvestmentAlerts}
                onChange={e =>
                  handleChange('notifyInvestmentAlerts', e.target.checked)
                }
                className="rounded"
              />
              <label htmlFor="investments" className="text-sm">
                Alertas de Investimento
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfers"
                checked={preferences.notifyAccountTransfers}
                onChange={e =>
                  handleChange('notifyAccountTransfers', e.target.checked)
                }
                className="rounded"
              />
              <label htmlFor="transfers" className="text-sm">
                Transferências entre Contas
              </label>
            </div>
          </div>
        </div>

        {/* Daily Digest */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-3">Resumo Diário</h4>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="digest"
                checked={preferences.dailyDigest}
                onChange={e => handleChange('dailyDigest', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="digest" className="text-sm">
                Ativar Resumo Diário
              </label>
            </div>

            {preferences.dailyDigest && (
              <div>
                <label className="text-sm">Hora do Resumo</label>
                <input
                  type="time"
                  value={preferences.digestTime}
                  onChange={e => handleChange('digestTime', e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            )}
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded text-sm ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Salvando...' : 'Salvar Preferências'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default NotificationSettings
