import { useEffect, useState } from 'react'
import NotificationList from '@/components/notifications/NotificationList'
import NotificationSettings from '@/components/notifications/NotificationSettings'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Title } from '@/components/ui/title'
import { useApi } from '@/hooks/useApi'
import { notificationsService } from '@/lib/apiServices'
import { MainLayout } from '@/components/layout/mainLayout'

const NotificationsPage = () => {
  const { execute } = useApi()
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    loadNotifications()
    loadUnreadCount()
  }, [currentPage])

  const loadNotifications = async () => {
    try {
      const response = await execute(() =>
        notificationsService.getAll(currentPage, 20)
      )
      if (response?.data) {
        setNotifications(
          Array.isArray(response.data) ? response.data : [response.data]
        )
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    }
  }

  const loadUnreadCount = async () => {
    try {
      const response = await execute(() =>
        notificationsService.getUnreadCount()
      )
      if (response?.data) {
        setUnreadCount(response.data.count || 0)
      }
    } catch (error) {
      console.error('Erro ao contar notificações não lidas:', error)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await execute(() => notificationsService.markAsRead(id, true))
      loadNotifications()
      loadUnreadCount()
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await execute(() => notificationsService.markAllAsRead())
      loadNotifications()
      loadUnreadCount()
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await execute(() => notificationsService.delete(id))
      loadNotifications()
      loadUnreadCount()
    } catch (error) {
      console.error('Erro ao deletar notificação:', error)
    }
  }

  const handleDeleteAll = async () => {
    try {
      await execute(() => notificationsService.deleteAll())
      loadNotifications()
      loadUnreadCount()
    } catch (error) {
      console.error('Erro ao deletar todas as notificações:', error)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title>Notificações</Title>
          <p className="text-gray-600">
            Você tem {unreadCount} notificação
            {unreadCount !== 1 ? 's' : ''} não lida
            {unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
          >
            Configurações
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Marcar Tudo Como Lido
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              onClick={handleDeleteAll}
              className="text-red-600"
            >
              Limpar Tudo
            </Button>
          )}
        </div>
      </div>

      {showSettings ? (
        <NotificationSettings onClose={() => setShowSettings(false)} />
      ) : (
        <>
          {notifications.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-600">Nenhuma notificação</p>
            </Card>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
            />
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              variant="outline"
            >
              Anterior
            </Button>
            <span>Página {currentPage}</span>
            <Button
              disabled={notifications.length < 20}
              onClick={() => setCurrentPage(currentPage + 1)}
              variant="outline"
            >
              Próxima
            </Button>
          </div>
        </>
      )}
      </div>
    </MainLayout>
  )
}

export default NotificationsPage
