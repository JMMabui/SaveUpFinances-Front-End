import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {
  debtPaymentsRequest,
  debtPaymentsResponse,
} from './Type/debts-payments.type'

const BASE = '/debts-payments' as const

export function useGetDebtPaymentsByDebt(debtId: string) {
  return useQuery({
    queryKey: ['debts-payments', 'by-debt', debtId],
    queryFn: async () =>
      apiService.get<debtPaymentsResponse[]>(`${BASE}/debt/${debtId}`),
    enabled: !!debtId,
  })
}

export function useGetDebtPaymentById(id: string) {
  return useQuery({
    queryKey: ['debts-payments', 'by-id', id],
    queryFn: async () => apiService.get<debtPaymentsResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateDebtPayment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'create'],
    mutationFn: async (data: debtPaymentsRequest) =>
      apiService.post<debtPaymentsResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
    },
  })
}

export function useUpdateDebtPayment(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'update', id],
    mutationFn: async (data: Partial<debtPaymentsRequest>) =>
      apiService.put<debtPaymentsResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
      queryClient.invalidateQueries({
        queryKey: ['debts-payments', 'by-id', id],
      })
    },
  })
}

export function useDeleteDebtPayment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
    },
  })
}
