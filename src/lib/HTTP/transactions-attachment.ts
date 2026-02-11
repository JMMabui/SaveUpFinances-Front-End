import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { TransactionsAttachmentGetTransactionAttachmentResponseSchema, TransactionsAttachmentGetTransactionAttachmentByIdResponseSchema, TransactionsAttachmentCreateTransactionAttachmentBodySchema, TransactionsAttachmentUpdateTransactionAttachmentByIdBodySchema } from '@/lib/openapi/zod/TransactionsAttachment'

export function useTransactionsAttachmentCreateTransactionAttachment() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = TransactionsAttachmentCreateTransactionAttachmentBodySchema.parse(data); let _path = '/transaction-attachment';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions-attachment'] })
      success('Transactions attachment criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar transactions attachment')
    },
  })
}

export function useTransactionsAttachmentGetTransactionAttachment() {
  return useQuery({
    queryKey: ['get-transactions-attachment', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/transaction-attachment'
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionsAttachmentGetTransactionAttachmentResponseSchema.safeParse(res).success ? TransactionsAttachmentGetTransactionAttachmentResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useTransactionsAttachmentGetTransactionAttachmentById(params?: any) {
  return useQuery({
    queryKey: ['get-transactions-attachment', params],
    queryFn: async (): Promise<any> => {
      const _path = '/transaction-attachment/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return TransactionsAttachmentGetTransactionAttachmentByIdResponseSchema.safeParse(res).success ? TransactionsAttachmentGetTransactionAttachmentByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionsAttachmentUpdateTransactionAttachmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = TransactionsAttachmentUpdateTransactionAttachmentByIdBodySchema.parse(data); let _path = '/transaction-attachment/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions-attachment'] })
      success('Transactions attachment atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar transactions attachment')
    },
  })
}

export function useTransactionsAttachmentDeleteTransactionAttachmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/transaction-attachment/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-transactions-attachment'] })
      success('Transactions attachment deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar transactions attachment')
    },
  })
}
