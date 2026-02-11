import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { AccountsSourceGetAccountSourceResponseSchema, AccountsSourceGetAccountSourceByIdResponseSchema, AccountsSourceGetAccountSourceByAccountResponseSchema, AccountsSourceCreateAccountSourceBodySchema, AccountsSourceUpdateAccountSourceByIdBodySchema } from '@/lib/openapi/zod/AccountsSource'

export function useAccountsSourceCreateAccountSource() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsSourceCreateAccountSourceBodySchema.parse(data); let _path = '/account-source';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-source'] })
      success('Accounts source criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts source')
    },
  })
}

export function useAccountsSourceGetAccountSource() {
  return useQuery({
    queryKey: ['get-accounts-source', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/account-source'
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsSourceGetAccountSourceResponseSchema.safeParse(res).success ? AccountsSourceGetAccountSourceResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useAccountsSourceGetAccountSourceById(params?: any) {
  return useQuery({
    queryKey: ['get-accounts-source', params],
    queryFn: async (): Promise<any> => {
      const _path = '/account-source/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsSourceGetAccountSourceByIdResponseSchema.safeParse(res).success ? AccountsSourceGetAccountSourceByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsSourceUpdateAccountSourceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsSourceUpdateAccountSourceByIdBodySchema.parse(data); let _path = '/account-source/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-source'] })
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
    mutationFn: async (id: string) => apiService.delete('/account-source/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts-source'] })
      success('Accounts source deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts source')
    },
  })
}

export function useAccountsSourceGetAccountSourceByAccount(params?: any) {
  return useQuery({
    queryKey: ['get-accounts-source', params],
    queryFn: async (): Promise<any> => {
      const _path = '/account-source/account/{accountId}'.replace('{accountId}', encodeURIComponent(String((params ?? {})['accountId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsSourceGetAccountSourceByAccountResponseSchema.safeParse(res).success ? AccountsSourceGetAccountSourceByAccountResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
