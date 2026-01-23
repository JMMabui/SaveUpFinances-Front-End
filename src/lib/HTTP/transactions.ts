import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  TransactionPostTransactionBodySchema,
  TransactionPutTransactionByIdBodySchema,
} from '@/lib/openapi/zod/Transaction'
import { apiService } from '../apiServices'
import type {
  TransactionRequest,
  TransactionResponse,
} from './Type/transactions.type'

const BASE = '/transactions' as const

export function useGetTransactionsByUser(userId: string) {
  return useQuery({
    queryKey: ['transactions', 'by-user', userId],
    queryFn: async () =>
      apiService.get<TransactionResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetTransactionsByAccount(accountId: string) {
  return useQuery({
    queryKey: ['transactions', 'by-account', accountId],
    queryFn: async () =>
      apiService.get<TransactionResponse[]>(`${BASE}/account/${accountId}`),
    enabled: !!accountId,
  })
}

export function useGetTransactionById(id: string) {
  return useQuery({
    queryKey: ['transactions', 'by-id', id],
    queryFn: async () => apiService.get<TransactionResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateTransaction() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['transactions', 'create'],
    mutationFn: async (data: TransactionRequest) => {
      const parsed = TransactionPostTransactionBodySchema.parse(data)
      return apiService.post<TransactionResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      success('Transação criada', 'A transação foi registada com sucesso.')
    },
    onError: () => {
      error('Falha ao criar transação', 'Verifique os dados e tente novamente.')
    },
  })
}

export function useUpdateTransaction(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['transactions', 'update', id],
    mutationFn: async (data: Partial<TransactionRequest>) => {
      const parsed = TransactionPutTransactionByIdBodySchema.parse(data)
      return apiService.put<TransactionResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transactions', 'by-id', id] })
      success('Transação atualizada', 'Alterações guardadas com sucesso.')
    },
    onError: () => {
      error('Falha ao atualizar transação', 'Tente novamente mais tarde.')
    },
  })
}

export function useDeleteTransaction() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['transactions', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      success('Transação removida', 'A transação foi apagada com sucesso.')
    },
    onError: () => {
      error('Falha ao remover transação', 'Tente novamente mais tarde.')
    },
  })
}
