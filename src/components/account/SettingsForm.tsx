import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { useApi } from '@/hooks/useApi'
import { userProfileService } from '@/lib/apiServices'

interface SettingsFormProps {
  userId: string
}

const SettingsForm = ({ userId }: SettingsFormProps) => {
  const { execute } = useApi()
  const [settings, setSettings] = useState({
    language: 'pt-BR',
    currency: 'MZN',
    theme: 'auto',
    timezone: 'UTC',
    dateFormat: 'DD/MM/YYYY',
    twoFactorEnabled: false,
  })
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  useEffect(() => {
    loadSettings()
  }, [userId])

  const loadSettings = async () => {
    try {
      const response = await execute(() =>
        userProfileService.getSettings(userId)
      )
      if (response?.data) {
        setSettings(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    }
  }

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await execute(() => userProfileService.updateSettings(userId, settings))
      setMessage({
        type: 'success',
        text: 'Configurações atualizadas com sucesso!',
      })
      setTimeout(() => setMessage(null), 2000)
    } catch {
      setMessage({ type: 'error', text: 'Erro ao atualizar configurações' })
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Idioma</label>
          <Select
            value={settings.language}
            onValueChange={value => handleChange('language', value)}
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">Inglês (EUA)</option>
            <option value="es-ES">Espanhol (Espanha)</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Moeda</label>
          <Select
            value={settings.currency}
            onValueChange={value => handleChange('currency', value)}
          >
            <option value="MZN">Metical (MZN)</option>
            <option value="USD">Dólar Americano (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">Libra Esterlina (GBP)</option>
            <option value="BRL">Real Brasileiro (BRL)</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tema</label>
          <Select
            value={settings.theme}
            onValueChange={value => handleChange('theme', value)}
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="auto">Automático</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fuso Horário</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={settings.timezone}
            onChange={e => handleChange('timezone', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Formato de Data
          </label>
          <Select
            value={settings.dateFormat}
            onValueChange={value => handleChange('dateFormat', value)}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="twoFactor"
            checked={settings.twoFactorEnabled}
            onChange={e => handleChange('twoFactorEnabled', e.target.checked)}
            className="rounded"
          />
          <label htmlFor="twoFactor" className="text-sm font-medium">
            Ativar Autenticação de Dois Fatores
          </label>
        </div>

        {message && (
          <div
            className={`p-3 rounded text-sm ${message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              }`}
          >
            {message.text}
          </div>
        )}

        <Button type="submit" className="w-full">
          Salvar Configurações
        </Button>
      </form>
    </Card>
  )
}

export default SettingsForm
