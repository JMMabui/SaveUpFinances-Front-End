import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/investmentgoals' as const

export function useInvestmentGoalsPostInvestmentGoal() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/investment-goal', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goals'] })
      success('Investment goals criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar investment goals')
    },
  })
}

export function useInvestmentGoalsGetInvestmentGoal() {
  return useQuery({
    queryKey: ['investment-goals-get', params],
    queryFn: async () => apiService.get('/investment-goal'),
    enabled: true,
  })
}

export function useInvestmentGoalsPutInvestmentGoalById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/investment-goal/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goals'] })
      success('Investment goals atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar investment goals')
    },
  })
}

export function useInvestmentGoalsDeleteInvestmentGoalById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/investment-goal/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goals'] })
      success('Investment goals deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar investment goals')
    },
  })
}
