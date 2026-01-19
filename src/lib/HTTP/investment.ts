import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {
  investmentRequest,
  investmentResponse,
} from './Type/investment.type'

const BASE = '/investment' as const

export function useGetInvestmentsByUser(userId: string) {
  return useQuery({
    queryKey: ['investment', 'by-user', userId],
    queryFn: async () =>
      apiService.get<investmentResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetInvestmentById(id: string) {
  return useQuery({
    queryKey: ['investment', 'by-id', id],
    queryFn: async () => apiService.get<investmentResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateInvestment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'create'],
    mutationFn: async (data: investmentRequest) =>
      apiService.post<investmentResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
    },
  })
}

export function useUpdateInvestment(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'update', id],
    mutationFn: async (data: Partial<investmentRequest>) =>
      apiService.put<investmentResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
      queryClient.invalidateQueries({ queryKey: ['investment', 'by-id', id] })
    },
  })
}

export function useDeleteInvestment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['investment', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment'] })
    },
  })
}
