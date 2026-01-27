import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/users' as const

export function useUsersPostUsers() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar users')
    },
  })
}

export function useUsersGetUsers() {
  return useQuery({
    queryKey: ['users-get', params],
    queryFn: async () => apiService.get('/users'),
    enabled: true,
  })
}

export function useUsersGetUsersById(params?: any) {
  return useQuery({
    queryKey: ['users-get', params],
    queryFn: async () => apiService.get('/users/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersPutUsersById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/users/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}

export function useUsersDeleteUsersById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/users/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar users')
    },
  })
}

export function useUsersGetUsersByIdProfile(params?: any) {
  return useQuery({
    queryKey: ['users-get', params],
    queryFn: async () => apiService.get('/users/{id}/profile', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersPutUsersByIdProfile() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/users/{id}/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}

export function useUsersPostUsersByIdChangePassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/users/{id}/change-password', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar users')
    },
  })
}

export function useUsersGetUsersByIdSettings(params?: any) {
  return useQuery({
    queryKey: ['users-get', params],
    queryFn: async () => apiService.get('/users/{id}/settings', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersPutUsersByIdSettings() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/users/{id}/settings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}
