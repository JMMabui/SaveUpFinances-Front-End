import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'create'],
    mutationFn: async (data: accountBalanceRequest) =>
      apiService.post<accountBalanceResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
    },
  })
}

export function useUpdateAccountBalance(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'update', id],
    mutationFn: async (data: Partial<accountBalanceRequest>) =>
      apiService.put<accountBalanceResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
      queryClient.invalidateQueries({
        queryKey: ['account-balance', 'by-id', id],
      })
    },
  })
}

export function useDeleteAccountBalance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-balance', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-balance'] })
    },
  })
}
