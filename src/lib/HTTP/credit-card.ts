import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  CreditCardsPostCreditCardsBodySchema,
  CreditCardsPutCreditCardsByIdBodySchema,
} from '@/lib/openapi/zod/CreditCards'
import { apiService } from '../apiServices'
import type {
  creditCardRequest,
  creditCardResponse,
} from './Type/credit-card.type'

const BASE = '/credit-cards' as const

export function useGetCreditCardsByUser(userId: string) {
  return useQuery({
    queryKey: ['credit-card', 'by-user', userId],
    queryFn: async () =>
      apiService.get<creditCardResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetCreditCardById(id: string) {
  return useQuery({
    queryKey: ['credit-card', 'by-id', id],
    queryFn: async () => apiService.get<creditCardResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateCreditCard() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['credit-card', 'create'],
    mutationFn: async (data: creditCardRequest) => {
      const parsed = CreditCardsPostCreditCardsBodySchema.parse(data)
      return apiService.post<creditCardResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card'] })
      success('Cartão de crédito criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar cartão de crédito')
    },
  })
}

export function useUpdateCreditCard(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['credit-card', 'update', id],
    mutationFn: async (data: Partial<creditCardRequest>) => {
      const parsed = CreditCardsPutCreditCardsByIdBodySchema.parse(data)
      return apiService.put<creditCardResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card'] })
      queryClient.invalidateQueries({ queryKey: ['credit-card', 'by-id', id] })
      success('Cartão de crédito atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar cartão de crédito')
    },
  })
}

export function useDeleteCreditCard() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['credit-card', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card'] })
      success('Cartão de crédito excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir cartão de crédito')
    },
  })
}
