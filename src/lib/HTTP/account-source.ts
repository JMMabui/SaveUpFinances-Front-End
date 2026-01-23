import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  AccountsSourcePostAccountSourceBodySchema,
  AccountsSourcePutAccountSourceByIdBodySchema,
} from '@/lib/openapi/zod/AccountsSource'
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
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'create'],
    mutationFn: async (data: accountSourceRequest) => {
      const parsed = AccountsSourcePostAccountSourceBodySchema.parse(data)
      return apiService.post<accountSourceResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
      success('Conta de origem criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar conta de origem')
    },
  })
}

export function useUpdateAccountSource(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'update', id],
    mutationFn: async (data: Partial<accountSourceRequest>) => {
      const parsed = AccountsSourcePutAccountSourceByIdBodySchema.parse(data)
      return apiService.put<accountSourceResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
      queryClient.invalidateQueries({
        queryKey: ['account-source', 'by-id', id],
      })
      success('Conta de origem atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar conta de origem')
    },
  })
}

export function useDeleteAccountSource() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['account-source', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-source'] })
      success('Conta de origem excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir conta de origem')
    },
  })
}
