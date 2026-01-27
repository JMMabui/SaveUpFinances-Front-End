import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/notifications' as const

export function useNotificationsGetNotifications(params?: any) {
  return useQuery({
    queryKey: ['notifications-get', params],
    queryFn: async () => apiService.get('/notifications', params),
    enabled: true,
  })
}

export function useNotificationsDeleteNotifications() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/notifications'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      success('Notifications deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar notifications')
    },
  })
}

export function useNotificationsGetNotificationsUnreadCount() {
  return useQuery({
    queryKey: ['notifications-get', params],
    queryFn: async () => apiService.get('/notifications/unread-count'),
    enabled: true,
  })
}

export function useNotificationsGetNotificationsById(params?: any) {
  return useQuery({
    queryKey: ['notifications-get', params],
    queryFn: async () => apiService.get('/notifications/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useNotificationsDeleteNotificationsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/notifications/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      success('Notifications deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar notifications')
    },
  })
}

export function useNotificationsPutNotificationsByIdRead() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/notifications/{id}/read', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}

export function useNotificationsPutNotificationsReadAll() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/notifications/read-all', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}

export function useNotificationsGetNotificationsPreferences() {
  return useQuery({
    queryKey: ['notifications-get', params],
    queryFn: async () => apiService.get('/notifications/preferences'),
    enabled: true,
  })
}

export function useNotificationsPutNotificationsPreferences() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/notifications/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}
