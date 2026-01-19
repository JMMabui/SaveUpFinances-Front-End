import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {
  accountSourceRequest,
  accountSourceResponse,
} from './Type/account-source.type'

const BASE = '/account-source' as const

export function useGetAccountSourcesByAccount(accountId: string) {
  return useQuery({
    queryKey: ['account-source', 'by-account', accountId],
    queryFn: async () =>
      apiService.get<accountSourceResponse[]>(`${BASE}/account/${accountId}`),
    enabled: !!accountId,
  })
}

export function useGetAccountSourceById(id: string) {
  return useQuery({
    queryKey: ['account-source', 'by-id', id],
    queryFn: async () => apiService.get<accountSourceResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateAccountSource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'create'],
    mutationFn: async (data: accountSourceRequest) =>
      apiService.post<accountSourceResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
    },
  })
}

export function useUpdateAccountSource(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'update', id],
    mutationFn: async (data: Partial<accountSourceRequest>) =>
      apiService.put<accountSourceResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
      queryClient.invalidateQueries({
        queryKey: ['account-source', 'by-id', id],
      })
    },
  })
}

export function useDeleteAccountSource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
    },
  })
}
