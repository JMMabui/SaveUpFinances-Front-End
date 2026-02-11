import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { AuthGetCsrfTokenResponseSchema, AuthGetResetPasswordByTokenResponseSchema, AuthCreateLoginBodySchema, AuthCreateForgotPasswordBodySchema, AuthCreateResetPasswordBodySchema, AuthCreateVerifyResetTokenBodySchema } from '@/lib/openapi/zod/Auth'

export function useAuthGetCsrfToken() {
  return useQuery({
    queryKey: ['get-auth', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/auth/csrf-token'
      const _url = _path
      const res = await apiService.get(_url)
      return AuthGetCsrfTokenResponseSchema.safeParse(res).success ? AuthGetCsrfTokenResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useAuthCreateLogin() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AuthCreateLoginBodySchema.parse(data); let _path = '/auth/login';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthCreateRefreshToken() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { let _path = '/auth/refresh-token';
      return apiService.post(_path, data) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthCreateLogout() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { let _path = '/auth/logout';
      return apiService.post(_path, data) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthCreateForgotPassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AuthCreateForgotPasswordBodySchema.parse(data); let _path = '/auth/forgot-password';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthCreateResetPassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AuthCreateResetPasswordBodySchema.parse(data); let _path = '/auth/reset-password';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthCreateVerifyResetToken() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AuthCreateVerifyResetTokenBodySchema.parse(data); let _path = '/auth/verify-reset-token';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-auth'] })
      success('Auth criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar auth')
    },
  })
}

export function useAuthGetResetPasswordByToken(params?: any) {
  return useQuery({
    queryKey: ['get-auth', params],
    queryFn: async (): Promise<any> => {
      const _path = '/auth/reset-password/{token}'.replace('{token}', encodeURIComponent(String((params ?? {})['token'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AuthGetResetPasswordByTokenResponseSchema.safeParse(res).success ? AuthGetResetPasswordByTokenResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
