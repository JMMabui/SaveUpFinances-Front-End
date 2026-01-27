import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/incomes' as const

export function useIncomesPostIncome() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/income', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      success('Incomes criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar incomes')
    },
  })
}

export function useIncomesGetIncome() {
  return useQuery({
    queryKey: ['incomes-get', params],
    queryFn: async () => apiService.get('/income'),
    enabled: true,
  })
}

export function useIncomesGetIncomeById(params?: any) {
  return useQuery({
    queryKey: ['incomes-get', params],
    queryFn: async () => apiService.get('/income/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomesPutIncomeById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/income/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      success('Incomes atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar incomes')
    },
  })
}

export function useIncomesDeleteIncomeById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/income/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes'] })
      success('Incomes deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar incomes')
    },
  })
}

export function useIncomesGetIncomeUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['incomes-get', params],
    queryFn: async () => apiService.get('/income/user/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomesGetIncomeSourceBySourceId(params?: any) {
  return useQuery({
    queryKey: ['incomes-get', params],
    queryFn: async () => apiService.get('/income/source/{sourceId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
