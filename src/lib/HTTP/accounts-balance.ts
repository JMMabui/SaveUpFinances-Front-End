import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { AccountsBalanceGetAccountBalanceResponseSchema, AccountsBalanceGetAccountBalanceByIdResponseSchema, AccountsBalanceGetAccountBalanceByAccountResponseSchema, AccountsBalanceCreateAccountBalanceBodySchema, AccountsBalanceUpdateAccountBalanceByIdBodySchema } from '@/lib/openapi/zod/AccountsBalance'

export function useAccountsBalanceCreateAccountBalance() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsBalanceCreateAccountBalanceBodySchema.parse(data); let _path = '/account-balance';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-balance'] })
      success('Accounts balance criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts balance')
    },
  })
}

export function useAccountsBalanceGetAccountBalance() {
  return useQuery({
    queryKey: ['get-accounts-balance', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/account-balance'
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsBalanceGetAccountBalanceResponseSchema.safeParse(res).success ? AccountsBalanceGetAccountBalanceResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useAccountsBalanceGetAccountBalanceById(params?: any) {
  return useQuery({
    queryKey: ['get-accounts-balance', params],
    queryFn: async (): Promise<any> => {
      const _path = '/account-balance/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsBalanceGetAccountBalanceByIdResponseSchema.safeParse(res).success ? AccountsBalanceGetAccountBalanceByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsBalanceUpdateAccountBalanceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsBalanceUpdateAccountBalanceByIdBodySchema.parse(data); let _path = '/account-balance/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-balance'] })
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
    mutationFn: async (id: string) => apiService.delete('/account-balance/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-balance'] })
      success('Accounts balance deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts balance')
    },
  })
}

export function useAccountsBalanceGetAccountBalanceByAccount(params?: any) {
  return useQuery({
    queryKey: ['get-accounts-balance', params],
    queryFn: async (): Promise<any> => {
      const _path = '/account-balance/account/{accountId}'.replace('{accountId}', encodeURIComponent(String((params ?? {})['accountId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsBalanceGetAccountBalanceByAccountResponseSchema.safeParse(res).success ? AccountsBalanceGetAccountBalanceByAccountResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
