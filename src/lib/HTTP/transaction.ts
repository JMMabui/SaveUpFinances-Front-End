import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/transaction' as const

export function useTransactionPostTransaction() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/transaction', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      success('Transaction criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar transaction')
    },
  })
}

export function useTransactionGetTransaction(params?: any) {
  return useQuery({
    queryKey: ['transaction-get', params],
    queryFn: async () => apiService.get('/transaction', params),
    enabled: true,
  })
}

export function useTransactionGetTransactionById(params?: any) {
  return useQuery({
    queryKey: ['transaction-get', params],
    queryFn: async () => apiService.get('/transaction/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useTransactionPutTransactionById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/transaction/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      success('Transaction atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar transaction')
    },
  })
}

export function useTransactionDeleteTransactionById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/transaction/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      success('Transaction deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar transaction')
    },
  })
}
