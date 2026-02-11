import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { TransactionGetTransactionsResponseSchema, TransactionGetTransactionsByAccountResponseSchema, TransactionGetTransactionsByCategoryResponseSchema, TransactionGetTransactionsByUserResponseSchema, TransactionGetTransactionsTypeByTypeResponseSchema, TransactionCreateBodySchema, TransactionUpdateByIdBodySchema } from '@/lib/openapi/zod/Transaction'

export function useTransactionCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = TransactionCreateBodySchema.parse(data); let _path = '/transaction';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transaction'] })
      success('Transaction criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar transaction')
    },
  })
}

export function useTransactionGetTransactions(params?: any) {
  return useQuery({
    queryKey: ['get-transaction', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transactions'
      const _usp = new URLSearchParams()
      if ((params ?? {})['page'] !== undefined && (params ?? {})['page'] !== null) { _usp.append('page', String((params ?? {})['page'])) }
      if ((params ?? {})['pageSize'] !== undefined && (params ?? {})['pageSize'] !== null) { _usp.append('pageSize', String((params ?? {})['pageSize'])) }
      if ((params ?? {})['userId'] !== undefined && (params ?? {})['userId'] !== null) { _usp.append('userId', String((params ?? {})['userId'])) }
      if ((params ?? {})['accountId'] !== undefined && (params ?? {})['accountId'] !== null) { _usp.append('accountId', String((params ?? {})['accountId'])) }
      if ((params ?? {})['categoryId'] !== undefined && (params ?? {})['categoryId'] !== null) { _usp.append('categoryId', String((params ?? {})['categoryId'])) }
      if ((params ?? {})['type'] !== undefined && (params ?? {})['type'] !== null) { _usp.append('type', String((params ?? {})['type'])) }
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return TransactionGetTransactionsResponseSchema.safeParse(res).success ? TransactionGetTransactionsResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useTransactionUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = TransactionUpdateByIdBodySchema.parse(data); let _path = '/transaction/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transaction'] })
      success('Transaction atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar transaction')
    },
  })
}

export function useTransactionDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/transaction/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transaction'] })
      success('Transaction deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar transaction')
    },
  })
}

export function useTransactionGetTransactionsByAccount(params?: any) {
  return useQuery({
    queryKey: ['get-transaction', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transactions/account/{accountId}'.replace('{accountId}', encodeURIComponent(String((params ?? {})['accountId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionGetTransactionsByAccountResponseSchema.safeParse(res).success ? TransactionGetTransactionsByAccountResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionGetTransactionsByCategory(params?: any) {
  return useQuery({
    queryKey: ['get-transaction', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transactions/category/{categoryId}'.replace('{categoryId}', encodeURIComponent(String((params ?? {})['categoryId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionGetTransactionsByCategoryResponseSchema.safeParse(res).success ? TransactionGetTransactionsByCategoryResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionGetTransactionsByUser(params?: any) {
  return useQuery({
    queryKey: ['get-transaction', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transactions/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionGetTransactionsByUserResponseSchema.safeParse(res).success ? TransactionGetTransactionsByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionGetTransactionsTypeByType(params?: any) {
  return useQuery({
    queryKey: ['get-transaction', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transactions/type/{type}'.replace('{type}', encodeURIComponent(String((params ?? {})['type'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionGetTransactionsTypeByTypeResponseSchema.safeParse(res).success ? TransactionGetTransactionsTypeByTypeResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useTransactionCreate as useCreateTransaction }
export { useTransactionUpdateById as useUpdateTransaction }
export { useTransactionDeleteById as useDeleteTransaction }