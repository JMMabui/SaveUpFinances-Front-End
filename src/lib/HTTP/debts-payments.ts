import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  DebtPaymentsCreateBodySchema,
  DebtPaymentsUpdateByIdBodySchema,
} from '@/lib/openapi/zod/DebtPayments'
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
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'create'],
    mutationFn: async (data: debtPaymentsRequest) => {
      const parsed = DebtPaymentsCreateBodySchema.parse(data)
      return apiService.post<debtPaymentsResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
      success('Pagamento de dívida criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar pagamento de dívida')
    },
  })
}

export function useUpdateDebtPayment(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'update', id],
    mutationFn: async (data: Partial<debtPaymentsRequest>) => {
      const parsed = DebtPaymentsUpdateByIdBodySchema.parse(data)
      return apiService.put<debtPaymentsResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
      queryClient.invalidateQueries({
        queryKey: ['debts-payments', 'by-id', id],
      })
      success('Pagamento de dívida atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar pagamento de dívida')
    },
  })
}

export function useDeleteDebtPayment() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['debts-payments', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-payments'] })
      success('Pagamento de dívida excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir pagamento de dívida')
    },
  })
}
