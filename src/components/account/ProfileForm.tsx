import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'
import { userProfileService } from '@/lib/apiServices'

interface ProfileFormProps {
  profile: any
  onSuccess: () => void
}

const ProfileForm = ({ profile, onSuccess }: ProfileFormProps) => {
  const { user } = useAuth()
  const { execute } = useApi()
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    surname: profile?.surname || '',
    contact: profile?.contact || '',
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
    try {
      await execute(() =>
        userProfileService.updateProfile(user?.id || '', formData)
      )
      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' })
      setTimeout(() => {
        setMessage(null)
        onSuccess()
      }, 2000)
    } catch {
      setMessage({ type: 'error', text: 'Erro ao atualizar perfil' })
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sobrenome</label>
          <Input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Seu sobrenome"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <Input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Seu telefone"
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
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Card>
  )
}

export default ProfileForm
