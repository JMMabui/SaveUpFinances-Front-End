import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  IncomesPostIncomeBodySchema,
  IncomesPutIncomeByIdBodySchema,
} from '@/lib/openapi/zod/Incomes'
import { apiService } from '../apiServices'
import type { incomeRequest, incomeResponse } from './Type/income.type'

const BASE = '/income' as const

export function useGetIncomeByUser(userId: string) {
  return useQuery({
    queryKey: ['income', 'by-user', userId],
    queryFn: async () =>
      apiService.get<incomeResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetIncomeById(id: string) {
  return useQuery({
    queryKey: ['income', 'by-id', id],
    queryFn: async () => apiService.get<incomeResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateIncome() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income', 'create'],
    mutationFn: async (data: incomeRequest) => {
      const parsed = IncomesPostIncomeBodySchema.parse(data)
      return apiService.post<incomeResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
      success('Receita criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar receita')
    },
  })
}

export function useUpdateIncome(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income', 'update', id],
    mutationFn: async (data: Partial<incomeRequest>) => {
      const parsed = IncomesPutIncomeByIdBodySchema.parse(data)
      return apiService.put<incomeResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
      queryClient.invalidateQueries({ queryKey: ['income', 'by-id', id] })
      success('Receita atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar receita')
    },
  })
}

export function useDeleteIncome() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] })
      success('Receita excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir receita')
    },
  })
}
