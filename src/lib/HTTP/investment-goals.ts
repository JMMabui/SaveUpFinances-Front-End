import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { InvestmentGoalsGetInvestmentGoalResponseSchema, InvestmentGoalsCreateInvestmentGoalBodySchema, InvestmentGoalsUpdateInvestmentGoalByIdBodySchema } from '@/lib/openapi/zod/InvestmentGoals'

export function useInvestmentGoalsCreateInvestmentGoal() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = InvestmentGoalsCreateInvestmentGoalBodySchema.parse(data); let _path = '/investment-goal';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investment-goals'] })
      success('Investment goals criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar investment goals')
    },
  })
}

export function useInvestmentGoalsGetInvestmentGoal() {
  return useQuery({
    queryKey: ['get-investment-goals', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/investment-goal'
      const _url = _path
      const res = await apiService.get(_url)
      return InvestmentGoalsGetInvestmentGoalResponseSchema.safeParse(res).success ? InvestmentGoalsGetInvestmentGoalResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useInvestmentGoalsUpdateInvestmentGoalById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = InvestmentGoalsUpdateInvestmentGoalByIdBodySchema.parse(data); let _path = '/investment-goal/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investment-goals'] })
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
    mutationFn: async (id: string) => apiService.delete('/investment-goal/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investment-goals'] })
      success('Investment goals deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar investment goals')
    },
  })
}
