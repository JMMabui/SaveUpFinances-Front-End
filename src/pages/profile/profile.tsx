import { useEffect, useState } from 'react'
import ChangePasswordForm from '@/components/account/ChangePasswordForm'
import ProfileForm from '@/components/account/ProfileForm'
import SettingsForm from '@/components/account/SettingsForm'
import { Title } from '@/components/ui/title'
import { useAuth } from '@/hooks/useAuth'
import { userProfileService } from '@/lib/apiServices'
import { MainLayout } from '@/components/layout/mainLayout'

const ProfilePage = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (user?.id) {
      loadProfile()
    }
  }, [user?.id])

  const loadProfile = async () => {
    try {
      const response = await userProfileService.getProfile(user?.id || '')
      if (response?.data) {
        setProfile(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    }
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <MainLayout>
      <div className="space-y-6">
      <div>
        <Title>Meu Perfil</Title>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e configurações
        </p>
      </div>

      <div className="flex gap-4 border-b">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Perfil
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'settings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Configurações
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('password')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'password'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600'
          }`}
        >
          Senha
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'profile' && (
          <ProfileForm profile={profile} onSuccess={loadProfile} />
        )}
        {activeTab === 'settings' && <SettingsForm userId={user.id} />}
        {activeTab === 'password' && <ChangePasswordForm userId={user.id} />}
      </div>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
