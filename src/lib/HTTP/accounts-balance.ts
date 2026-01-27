import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/accountsbalance' as const

export function useAccountsBalancePostAccountBalance() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/account-balance', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-balance'] })
      success('Accounts balance criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts balance')
    },
  })
}

export function useAccountsBalanceGetAccountBalance() {
  return useQuery({
    queryKey: ['accounts-balance-get', params],
    queryFn: async () => apiService.get('/account-balance'),
    enabled: true,
  })
}

export function useAccountsBalanceGetAccountBalanceById(params?: any) {
  return useQuery({
    queryKey: ['accounts-balance-get', params],
    queryFn: async () => apiService.get('/account-balance/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsBalancePutAccountBalanceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/account-balance/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-balance'] })
      success('Accounts balance atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar accounts balance')
    },
  })
}

export function useAccountsBalanceDeleteAccountBalanceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/account-balance/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts-balance'] })
      success('Accounts balance deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts balance')
    },
  })
}

export function useAccountsBalanceGetAccountBalanceAccountByAccountId(
  params?: any
) {
  return useQuery({
    queryKey: ['accounts-balance-get', params],
    queryFn: async () =>
      apiService.get('/account-balance/account/{accountId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
