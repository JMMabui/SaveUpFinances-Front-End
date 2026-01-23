import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  BudgetPostBudgetBodySchema,
  BudgetPutBudgetByIdBodySchema,
} from '@/lib/openapi/zod/Budget'
import { apiService } from '../apiServices'
import type {
  budgetRequest,
  budgetResponse,
  budgetUpdateRequest,
} from './Type/budget.type'

const BASE = '/budget' as const

export function useGetBudgetsByUser(userId: string) {
  return useQuery({
    queryKey: ['budget', 'by-user', userId],
    queryFn: async () =>
      apiService.get<budgetResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetBudgetById(id: string) {
  return useQuery({
    queryKey: ['budget', 'by-id', id],
    queryFn: async () => apiService.get<budgetResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateBudget() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['budget', 'create'],
    mutationFn: async (data: budgetRequest) => {
      const parsed = BudgetPostBudgetBodySchema.parse(data)
      return apiService.post<budgetResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Orçamento criado', 'O orçamento foi criado com sucesso.')
    },
    onError: () => {
      error('Falha ao criar orçamento', 'Verifique os dados e tente novamente.')
    },
  })
}

export function useUpdateBudget(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['budget', 'update', id],
    mutationFn: async (data: budgetUpdateRequest) => {
      const parsed = BudgetPutBudgetByIdBodySchema.parse(data)
      return apiService.put<budgetResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      queryClient.invalidateQueries({ queryKey: ['budget', 'by-id', id] })
      success('Orçamento atualizado', 'Alterações guardadas com sucesso.')
    },
    onError: () => {
      error('Falha ao atualizar orçamento', 'Tente novamente mais tarde.')
    },
  })
}

export function useDeleteBudget() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['budget', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'] })
      success('Orçamento removido', 'O orçamento foi apagado com sucesso.')
    },
    onError: () => {
      error('Falha ao remover orçamento', 'Tente novamente mais tarde.')
    },
  })
}
