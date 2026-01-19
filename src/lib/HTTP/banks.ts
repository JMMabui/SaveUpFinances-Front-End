import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'create'],
    mutationFn: async (data: bankRequest) =>
      apiService.post<bankResponde>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
    },
  })
}

export function useUpdateBank(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'update', id],
    mutationFn: async (data: Partial<bankRequest>) =>
      apiService.put<bankResponde>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
      queryClient.invalidateQueries({ queryKey: ['banks', 'by-id', id] })
    },
  })
}

export function useDeleteBank() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['banks', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] })
    },
  })
}
