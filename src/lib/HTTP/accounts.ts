import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { AccountsGetResponseSchema, AccountsGetByIdResponseSchema, AccountsGetByIdTransactionsResponseSchema, AccountsGetDefaultByUserResponseSchema, AccountsGetAccountByUserResponseSchema, AccountsCreateBodySchema, AccountsUpdateByIdBodySchema } from '@/lib/openapi/zod/Accounts'

export function useAccountsCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsCreateBodySchema.parse(data); let _path = '/accounts';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      success('Accounts criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar accounts')
    },
  })
}

export function useAccountsGet() {
  return useQuery({
    queryKey: ['get-accounts', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/accounts'
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsGetResponseSchema.safeParse(res).success ? AccountsGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useAccountsGetById(params?: any) {
  return useQuery({
    queryKey: ['get-accounts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/accounts/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsGetByIdResponseSchema.safeParse(res).success ? AccountsGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = AccountsUpdateByIdBodySchema.parse(data); let _path = '/accounts/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      success('Accounts atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar accounts')
    },
  })
}

export function useAccountsDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/accounts/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      success('Accounts deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar accounts')
    },
  })
}

export function useAccountsGetByIdTransactions(params?: any) {
  return useQuery({
    queryKey: ['get-accounts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/accounts/{id}/transactions'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsGetByIdTransactionsResponseSchema.safeParse(res).success ? AccountsGetByIdTransactionsResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsGetDefaultByUser(params?: any) {
  return useQuery({
    queryKey: ['get-accounts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/accounts/default/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsGetDefaultByUserResponseSchema.safeParse(res).success ? AccountsGetDefaultByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useAccountsGetAccountByUser(params?: any) {
  return useQuery({
    queryKey: ['get-accounts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/account/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return AccountsGetAccountByUserResponseSchema.safeParse(res).success ? AccountsGetAccountByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useAccountsCreate as useCreateAccount }
export { useAccountsUpdateById as useUpdateAccount }
export { useAccountsDeleteById as useDeleteAccount }
export { useAccountsGet as useGetAccounts }
export { useAccountsGetById as useGetAccountsById }
export { useAccountsGetById as useGetAccountById }