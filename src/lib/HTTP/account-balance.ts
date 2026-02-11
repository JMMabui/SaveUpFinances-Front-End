import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  AccountsBalanceCreateAccountBalanceBodySchema,
  AccountsBalanceUpdateAccountBalanceByIdBodySchema,
} from '@/lib/openapi/zod/AccountsBalance'
import { apiService } from '../apiServices'
import type {
  accountBalanceRequest,
  accountBalanceResponse,
} from './Type/account-balance.type'

const BASE = '/account-balance' as const

export function useGetAccountBalanceByAccount(accountId: string) {
  return useQuery({
    queryKey: ['account-balance', 'by-account', accountId],
    queryFn: async () =>
      apiService.get<accountBalanceResponse[]>(`${BASE}/account/${accountId}`),
    enabled: !!accountId,
  })
}

export function useGetAccountBalanceById(id: string) {
  return useQuery({
    queryKey: ['account-balance', 'by-id', id],
    queryFn: async () =>
      apiService.get<accountBalanceResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateAccountBalance() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'create'],
    mutationFn: async (data: accountBalanceRequest) => {
      const parsed = AccountsBalanceCreateAccountBalanceBodySchema.parse(data)
      return apiService.post<accountBalanceResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
      success('Conta de saldo criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar conta de saldo')
    },
  })
}

export function useUpdateAccountBalance(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'update', id],
    mutationFn: async (data: Partial<accountBalanceRequest>) => {
      const parsed = AccountsBalanceUpdateAccountBalanceByIdBodySchema.parse(data)
      return apiService.put<accountBalanceResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
      queryClient.invalidateQueries({
        queryKey: ['account-balance', 'by-id', id],
      })
      success('Conta de saldo atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar conta de saldo')
    },
  })
}

export function useDeleteAccountBalance() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
      success('Conta de saldo excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir conta de saldo')
    },
  })
}
