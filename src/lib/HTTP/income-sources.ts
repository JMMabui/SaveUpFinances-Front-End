import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  IncomeSourcePostIncomeSourceBodySchema,
  IncomeSourcePutIncomeSourceByIdBodySchema,
} from '@/lib/openapi/zod/IncomeSource'
import { apiService } from '../apiServices'
import type {
  incomeSourceRequest,
  incomeSourceResponse,
} from './Type/income-sources.type'

const BASE = '/income-sources' as const

export function useGetIncomeSourcesByUser(userId: string) {
  return useQuery({
    queryKey: ['income-sources', 'by-user', userId],
    queryFn: async () =>
      apiService.get<incomeSourceResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetIncomeSourceById(id: string) {
  return useQuery({
    queryKey: ['income-sources', 'by-id', id],
    queryFn: async () => apiService.get<incomeSourceResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateIncomeSource() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income-sources', 'create'],
    mutationFn: async (data: incomeSourceRequest) => {
      const parsed = IncomeSourcePostIncomeSourceBodySchema.parse(data)
      return apiService.post<incomeSourceResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-sources'] })
      success('Fonte de renda criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar fonte de renda')
    },
  })
}

export function useUpdateIncomeSource(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income-sources', 'update', id],
    mutationFn: async (data: Partial<incomeSourceRequest>) => {
      const parsed = IncomeSourcePutIncomeSourceByIdBodySchema.parse(data)
      return apiService.put<incomeSourceResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-sources'] })
      queryClient.invalidateQueries({
        queryKey: ['income-sources', 'by-id', id],
      })
      success('Fonte de renda atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar fonte de renda')
    },
  })
}

export function useDeleteIncomeSource() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['income-sources', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income-sources'] })
      success('Fonte de renda excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir fonte de renda')
    },
  })
}
