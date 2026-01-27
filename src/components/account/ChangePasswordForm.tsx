import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks/useApi'
import { userProfileService } from '@/lib/apiServices'

interface ChangePasswordFormProps {
  userId: string
}

const ChangePasswordForm = ({ userId }: ChangePasswordFormProps) => {
  const { request, loading } = useApi()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não correspondem' })
      return
    }

    if (formData.newPassword.length < 6) {
      setMessage({
        type: 'error',
        text: 'A nova senha deve ter pelo menos 6 caracteres',
      })
      return
    }

    try {
      await request(() =>
        userProfileService.changePassword(userId, {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        })
      )
      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' })
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setTimeout(() => setMessage(null), 2000)
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error?.response?.data?.message || 'Erro ao alterar senha',
      })
    }
  }

  return (
    <Card className="p-6 max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Senha Atual</label>
          <Input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Digite sua senha atual"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nova Senha</label>
          <Input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Digite a nova senha"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirmar Senha
          </label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme a nova senha"
            required
          />
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

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Alterando...' : 'Alterar Senha'}
        </Button>
      </form>
    </Card>
  )
}

export default ChangePasswordForm
