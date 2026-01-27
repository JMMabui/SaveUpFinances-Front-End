import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/accounts' as const

export function useAccountsPostAccounts() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/accounts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      success('Accounts criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts')
    },
  })
}

export function useAccountsGetAccounts() {
  return useQuery({
    queryKey: ['accounts-get', params],
    queryFn: async () => apiService.get('/accounts'),
    enabled: true,
  })
}

export function useAccountsGetAccountsById(params?: any) {
  return useQuery({
    queryKey: ['accounts-get', params],
    queryFn: async () => apiService.get('/accounts/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsPutAccountsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/accounts/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      success('Accounts atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar accounts')
    },
  })
}

export function useAccountsDeleteAccountsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/accounts/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      success('Accounts deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts')
    },
  })
}

export function useAccountsGetAccountsByIdTransactions(params?: any) {
  return useQuery({
    queryKey: ['accounts-get', params],
    queryFn: async () => apiService.get('/accounts/{id}/transactions', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsGetAccountsDefaultByUserId(params?: any) {
  return useQuery({
    queryKey: ['accounts-get', params],
    queryFn: async () => apiService.get('/accounts/default/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsGetAccountByUserId(params?: any) {
  return useQuery({
    queryKey: ['accounts-get', params],
    queryFn: async () => apiService.get('/account/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
