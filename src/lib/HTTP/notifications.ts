import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { NotificationsGetResponseSchema, NotificationsGetUnreadCountResponseSchema, NotificationsGetByIdResponseSchema, NotificationsGetPreferencesResponseSchema, NotificationsUpdateByIdReadBodySchema, NotificationsUpdatePreferencesBodySchema } from '@/lib/openapi/zod/Notifications'

export function useNotificationsGet(params?: any) {
  return useQuery({
    queryKey: ['get-notifications', params],
    queryFn: async (): Promise<any> => {
      const _path = '/notifications'
      const _usp = new URLSearchParams()
      if ((params ?? {})['page'] !== undefined && (params ?? {})['page'] !== null) { _usp.append('page', String((params ?? {})['page'])) }
      if ((params ?? {})['pageSize'] !== undefined && (params ?? {})['pageSize'] !== null) { _usp.append('pageSize', String((params ?? {})['pageSize'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return NotificationsGetResponseSchema.safeParse(res).success ? NotificationsGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useNotificationsDelete() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async () => { let _path = '/notifications';
      return apiService.delete(_path) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-notifications'] })
      success('Notifications deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar notifications')
    },
  })
}

export function useNotificationsGetUnreadCount() {
  return useQuery({
    queryKey: ['get-notifications', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/notifications/unread-count'
      const _url = _path
      const res = await apiService.get(_url)
      return NotificationsGetUnreadCountResponseSchema.safeParse(res).success ? NotificationsGetUnreadCountResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useNotificationsGetById(params?: any) {
  return useQuery({
    queryKey: ['get-notifications', params],
    queryFn: async (): Promise<any> => {
      const _path = '/notifications/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return NotificationsGetByIdResponseSchema.safeParse(res).success ? NotificationsGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useNotificationsDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/notifications/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-notifications'] })
      success('Notifications deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar notifications')
    },
  })
}

export function useNotificationsUpdateByIdRead() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = NotificationsUpdateByIdReadBodySchema.parse(data); let _path = '/notifications/{id}/read';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}

export function useNotificationsUpdateReadAll() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { let _path = '/notifications/read-all';
      return apiService.put(_path, data) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}

export function useNotificationsGetPreferences() {
  return useQuery({
    queryKey: ['get-notifications', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/notifications/preferences'
      const _url = _path
      const res = await apiService.get(_url)
      return NotificationsGetPreferencesResponseSchema.safeParse(res).success ? NotificationsGetPreferencesResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useNotificationsUpdatePreferences() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = NotificationsUpdatePreferencesBodySchema.parse(data); let _path = '/notifications/preferences';
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-notifications'] })
      success('Notifications atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar notifications')
    },
  })
}

export { useNotificationsDeleteById as useDeleteNotification }
export { useNotificationsGet as useGetNotifications }
export { useNotificationsGetById as useGetNotificationsById }
export { useNotificationsGetById as useGetNotificationById }
