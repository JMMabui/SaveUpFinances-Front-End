import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/transactionsattachment' as const

export function useTransactionsAttachmentPostTransactionAttachment() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/transaction-attachment', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions-attachment'] })
      success('Transactions attachment criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar transactions attachment')
    },
  })
}

export function useTransactionsAttachmentGetTransactionAttachment() {
  return useQuery({
    queryKey: ['transactions-attachment-get', params],
    queryFn: async () => apiService.get('/transaction-attachment'),
    enabled: true,
  })
}

export function useTransactionsAttachmentGetTransactionAttachmentById(
  params?: any
) {
  return useQuery({
    queryKey: ['transactions-attachment-get', params],
    queryFn: async () => apiService.get('/transaction-attachment/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionsAttachmentPutTransactionAttachmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/transaction-attachment/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions-attachment'] })
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
    mutationFn: async (id: string) =>
      apiService.delete('/transaction-attachment/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions-attachment'] })
      success('Transactions attachment deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar transactions attachment')
    },
  })
}
