import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface NotificationListProps {
  notifications: any[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

const NotificationList = ({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationListProps) => {
  const getNotificationIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      expense: '💰',
      income: '💵',
      debt: '📊',
      budget: '📈',
      investment: '📉',
      alert: '⚠️',
      info: 'ℹ️',
    }
    return icons[type] || '🔔'
  }

  const getNotificationColor = (isRead: boolean) => {
    return isRead ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
  }

  return (
    <div className="space-y-2">
      {notifications.map(notif => (
        <Card
          key={notif.id}
          className={`p-4 border-2 ${getNotificationColor(notif.isRead)}`}
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">{getNotificationIcon(notif.type)}</span>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3
                    className={`font-semibold ${
                      notif.isRead ? 'text-gray-700' : 'text-blue-900'
                    }`}
                  >
                    {notif.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                </div>
                {!notif.isRead && (
                  <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {dayjs(notif.createdAt).fromNow()}
              </p>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              {!notif.isRead && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMarkAsRead(notif.id)}
                >
                  Marcar lida
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="text-red-600"
                onClick={() => onDelete(notif.id)}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default NotificationList
