import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  InvestmentGoalsPostInvestmentGoalBodySchema,
  InvestmentGoalsPutInvestmentGoalByIdBodySchema,
} from '@/lib/openapi/zod/InvestmentGoals'
import { apiService } from '../apiServices'
import type {
  investmentRequest,
  investmentResponse,
} from './Type/investment-goal.type'

const BASE = '/investment-goal' as const

export function useGetInvestmentGoalsByUser(userId: string) {
  return useQuery({
    queryKey: ['investment-goal', 'by-user', userId],
    queryFn: async () =>
      apiService.get<investmentResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetInvestmentGoalById(id: string) {
  return useQuery({
    queryKey: ['investment-goal', 'by-id', id],
    queryFn: async () => apiService.get<investmentResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateInvestmentGoal() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment-goal', 'create'],
    mutationFn: async (data: investmentRequest) => {
      const parsed = InvestmentGoalsPostInvestmentGoalBodySchema.parse(data)
      return apiService.post<investmentResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goal'] })
      success('Objetivo de investimento criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar objetivo de investimento')
    },
  })
}

export function useUpdateInvestmentGoal(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment-goal', 'update', id],
    mutationFn: async (data: Partial<investmentRequest>) => {
      const parsed = InvestmentGoalsPutInvestmentGoalByIdBodySchema.parse(data)
      return apiService.put<investmentResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goal'] })
      queryClient.invalidateQueries({
        queryKey: ['investment-goal', 'by-id', id],
      })
      success('Objetivo de investimento atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar objetivo de investimento')
    },
  })
}

export function useDeleteInvestmentGoal() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment-goal', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-goal'] })
      success('Objetivo de investimento excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir objetivo de investimento')
    },
  })
}
