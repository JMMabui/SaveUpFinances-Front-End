import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/auth' as const

export function useAuthGetAuthCsrfToken() {
  return useQuery({
    queryKey: ['auth-get', params],
    queryFn: async () => apiService.get('/auth/csrf-token'),
    enabled: true,
  })
}

export function useAuthPostAuthLogin() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/auth/login', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthPostAuthRefreshToken() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/auth/refresh-token', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthPostAuthLogout() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/auth/logout', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthPostAuthForgotPassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/auth/forgot-password', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthPostAuthResetPassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/auth/reset-password', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthPostAuthVerifyResetToken() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/auth/verify-reset-token', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthGetAuthResetPasswordByToken(params?: any) {
  return useQuery({
    queryKey: ['auth-get', params],
    queryFn: async () => apiService.get('/auth/reset-password/{token}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
