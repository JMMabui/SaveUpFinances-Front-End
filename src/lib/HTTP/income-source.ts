import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/incomesource' as const

export function useIncomeSourcePostIncomeSource() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/income-source', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-source'] })
      success('Income source criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar income source')
    },
  })
}

export function useIncomeSourceGetIncomeSource() {
  return useQuery({
    queryKey: ['income-source-get', params],
    queryFn: async () => apiService.get('/income-source'),
    enabled: true,
  })
}

export function useIncomeSourceGetIncomeSourceById(params?: any) {
  return useQuery({
    queryKey: ['income-source-get', params],
    queryFn: async () => apiService.get('/income-source/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomeSourcePutIncomeSourceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/income-source/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-source'] })
      success('Income source atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar income source')
    },
  })
}

export function useIncomeSourceDeleteIncomeSourceById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/income-source/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-source'] })
      success('Income source deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar income source')
    },
  })
}
