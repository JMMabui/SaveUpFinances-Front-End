import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/accountssource' as const

export function useAccountsSourcePostAccountSource() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/account-source', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-source'] })
      success('Accounts source criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts source')
    },
  })
}

export function useAccountsSourceGetAccountSource() {
  return useQuery({
    queryKey: ['accounts-source-get', params],
    queryFn: async () => apiService.get('/account-source'),
    enabled: true,
  })
}

export function useAccountsSourceGetAccountSourceById(params?: any) {
  return useQuery({
    queryKey: ['accounts-source-get', params],
    queryFn: async () => apiService.get('/account-source/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsSourcePutAccountSourceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/account-source/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-source'] })
      success('Accounts source atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar accounts source')
    },
  })
}

export function useAccountsSourceDeleteAccountSourceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/account-source/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-source'] })
      success('Accounts source deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts source')
    },
  })
}

export function useAccountsSourceGetAccountSourceAccountByAccountId(
  params?: any
) {
  return useQuery({
    queryKey: ['accounts-source-get', params],
    queryFn: async () =>
      apiService.get('/account-source/account/{accountId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
