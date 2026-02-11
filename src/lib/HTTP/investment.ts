import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  InvestmentsCreateInvestmentBodySchema,
  InvestmentsUpdateInvestmentByIdBodySchema,
} from '@/lib/openapi/zod/Investments'
import { apiService } from '../apiServices'
import type {
  investmentRequest,
  investmentResponse,
} from './Type/investment.type'

const BASE = '/investment' as const

export function useGetInvestmentsByUser(userId: string) {
  return useQuery({
    queryKey: ['investment', 'by-user', userId],
    queryFn: async () =>
      apiService.get<investmentResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetInvestmentById(id: string) {
  return useQuery({
    queryKey: ['investment', 'by-id', id],
    queryFn: async () => apiService.get<investmentResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateInvestment() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'create'],
    mutationFn: async (data: investmentRequest) => {
      const parsed = InvestmentsCreateInvestmentBodySchema.parse(data)
      return apiService.post<investmentResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
      success('Investimento criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar investimento')
    },
  })
}

export function useUpdateInvestment(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'update', id],
    mutationFn: async (data: Partial<investmentRequest>) => {
      const parsed = InvestmentsUpdateInvestmentByIdBodySchema.parse(data)
      return apiService.put<investmentResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
      queryClient.invalidateQueries({ queryKey: ['investment', 'by-id', id] })
      success('Investimento atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar investimento')
    },
  })
}

export function useDeleteInvestment() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
      success('Investimento excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir investimento')
    },
  })
}
