import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accountService, apiService } from '../apiServices'
import type { accountRequest, accountResponse } from './Type/account.type'

const BASE = '/accounts' as const

export function getAccounts() {
  return useQuery({
    queryKey: ['get-accounts-all'],
    queryFn: async () => apiService.get<accountResponse[]>(BASE),
  })
}

export function getAccountsByUserId(userId: string) {
  return useQuery({
    queryKey: ['get-accounts', userId],
    queryFn: async () => {
      return accountService.getByUserId(userId)
    },
    enabled: !!userId,
  })
}

export function getAccountById(id: string) {
  return useQuery({
    queryKey: ['get-account-by-id', id],
    queryFn: async () => accountService.getById(id),
    enabled: !!id,
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-account'],
    mutationFn: async (data: accountRequest | Partial<accountRequest>) =>
      accountService.create(data as Partial<accountResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
    },
  })
}

export function useUpdateAccount(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-account', id],
    mutationFn: async (data: Partial<accountRequest>) =>
      accountService.update(id, data as Partial<accountResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
      queryClient.invalidateQueries({ queryKey: ['get-account-by-id', id] })
    },
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: async (id: string) => accountService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
    },
  })
}
