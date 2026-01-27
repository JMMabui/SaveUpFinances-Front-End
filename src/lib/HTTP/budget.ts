import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/budget' as const

export function useBudgetPostBudget() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/budget', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Budget criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar budget')
    },
  })
}

export function useBudgetGetBudget() {
  return useQuery({
    queryKey: ['budget-get'],
    queryFn: async () => apiService.get('/budget'),
    enabled: true,
  })
}

export function useBudgetGetBudgetById(params?: any) {
  return useQuery({
    queryKey: ['budget-get', params],
    queryFn: async () => apiService.get(`/budget/${params?.id}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useBudgetPutBudgetById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put(`/budget/${data?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Budget atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar budget')
    },
  })
}

export function useBudgetDeleteBudgetById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/budget/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Budget deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar budget')
    },
  })
}

export function useBudgetGetBudgetUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['budget-get', params],
    queryFn: async () => apiService.get(`/budget/user/${params?.userId}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useBudgetPostBudgetGenerateRecurring() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.post('/budget/generate-recurring', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Budget criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar budget')
    },
  })
}

export function useGetBudgetsByUser(userId: string) {
  return useQuery({
    queryKey: ['budgets-by-user', userId],
    queryFn: async () => apiService.get(`/budget/user/${userId}`),
    enabled: !!userId,
  })
}

export function useDeleteBudget() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/budget/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Budget deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar budget')
    },
  })
}
