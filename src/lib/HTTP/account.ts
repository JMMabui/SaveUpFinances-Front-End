import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  AccountsCreateBodySchema,
  AccountsUpdateByIdBodySchema,
} from '@/lib/openapi/zod/Accounts'
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
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-account'],
    mutationFn: async (data: accountRequest | Partial<accountRequest>) => {
      const parsed = AccountsCreateBodySchema.parse(data)
      return accountService.create(parsed as Partial<accountResponse>)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
      success('Conta criada', 'A conta foi criada com sucesso.')
    },
    onError: () => {
      error('Falha ao criar conta', 'Tente novamente mais tarde.')
    },
  })
}

export function useUpdateAccount(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-account', id],
    mutationFn: async (data: Partial<accountRequest>) => {
      const parsed = AccountsUpdateByIdBodySchema.parse(data)
      return accountService.update(id, parsed as Partial<accountResponse>)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
      queryClient.invalidateQueries({ queryKey: ['get-account-by-id', id] })
      success('Conta atualizada', 'Alterações guardadas com sucesso.')
    },
    onError: () => {
      error('Falha ao atualizar conta', 'Verifique os dados e tente novamente.')
    },
  })
}

export function useDeleteAccount() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-account'],
    mutationFn: async (id: string) => accountService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-accounts'] })
      queryClient.invalidateQueries({ queryKey: ['get-accounts-all'] })
      success('Conta apagada', 'A conta foi removida com sucesso.')
    },
    onError: () => {
      error('Falha ao apagar conta', 'Tente novamente mais tarde.')
    },
  })
}
