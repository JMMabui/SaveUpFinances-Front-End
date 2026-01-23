import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'

import {
  DebtsPostDebtsBodySchema,
  DebtsPutDebtsByIdBodySchema,
} from '@/lib/openapi/zod/Debts'
import { apiService } from '../apiServices'
import type { debtsRequest, debtsResponse } from './Type/debts.type'

const BASE = '/debts' as const

export function useGetDebtsByUser(userId: string) {
  return useQuery({
    queryKey: ['debts', 'by-user', userId],
    queryFn: async () =>
      apiService.get<debtsResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetDebtById(id: string) {
  return useQuery({
    queryKey: ['debts', 'by-id', id],
    queryFn: async () => apiService.get<debtsResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateDebt() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts', 'create'],
    mutationFn: async (data: debtsRequest) => {
      const parsed = DebtsPostDebtsBodySchema.parse(data)
      return apiService.post<debtsResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Dívida criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar dívida')
    },
  })
}

export function useUpdateDebt(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts', 'update', id],
    mutationFn: async (data: Partial<debtsRequest>) => {
      const parsed = DebtsPutDebtsByIdBodySchema.parse(data)
      return apiService.put<debtsResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      queryClient.invalidateQueries({ queryKey: ['debts', 'by-id', id] })
      success('Dívida atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar dívida')
    },
  })
}

export function useDeleteDebt() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Dívida excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir dívida')
    },
  })
}
