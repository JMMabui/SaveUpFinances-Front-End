import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  BanksPostBanksBodySchema,
  BanksPutBanksByIdBodySchema,
} from '@/lib/openapi/zod/Banks'
import { apiService } from '../apiServices'
import type { bankRequest, bankResponde } from './Type/banks.type'

const BASE = '/banks' as const

export function useGetBanks() {
  return useQuery({
    queryKey: ['banks', 'list'],
    queryFn: async () => apiService.get<bankResponde[]>(BASE),
  })
}

export function useGetBankById(id: string) {
  return useQuery({
    queryKey: ['banks', 'by-id', id],
    queryFn: async () => apiService.get<bankResponde>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateBank() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'create'],
    mutationFn: async (data: bankRequest) => {
      const parsed = BanksPostBanksBodySchema.parse(data)
      return apiService.post<bankResponde>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
      success('Banco criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar banco')
    },
  })
}

export function useUpdateBank(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'update', id],
    mutationFn: async (data: Partial<bankRequest>) => {
      const parsed = BanksPutBanksByIdBodySchema.parse(data)
      return apiService.put<bankResponde>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
      queryClient.invalidateQueries({ queryKey: ['banks', 'by-id', id] })
      success('Banco atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar banco')
    },
  })
}

export function useDeleteBank() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
      success('Banco excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir banco')
    },
  })
}
