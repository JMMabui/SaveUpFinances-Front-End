import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import { TransactionsGetTransactionByIdResponseSchema } from '@/lib/openapi/zod/Transactions'

export function useTransactionsGetTransactionById(params?: any) {
  return useQuery({
    queryKey: ['get-transactions', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transaction/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionsGetTransactionByIdResponseSchema.safeParse(res).success ? TransactionsGetTransactionByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
