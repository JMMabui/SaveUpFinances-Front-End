import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/debtpayments' as const

export function useDebtPaymentsPostDebtPayments() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/debt-payments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-payments'] })
      success('Debt payments criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar debt payments')
    },
  })
}

export function useDebtPaymentsGetDebtPayments() {
  return useQuery({
    queryKey: ['debt-payments-get', params],
    queryFn: async () => apiService.get('/debt-payments'),
    enabled: true,
  })
}

export function useDebtPaymentsGetDebtPaymentsById(params?: any) {
  return useQuery({
    queryKey: ['debt-payments-get', params],
    queryFn: async () => apiService.get('/debt-payments/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useDebtPaymentsPutDebtPaymentsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put('/debt-payments/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-payments'] })
      success('Debt payments atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar debt payments')
    },
  })
}

export function useDebtPaymentsDeleteDebtPaymentsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/debt-payments/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt-payments'] })
      success('Debt payments deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar debt payments')
    },
  })
}

export function useDebtPaymentsGetDebtPaymentsDebtByDebtId(params?: any) {
  return useQuery({
    queryKey: ['debt-payments-get', params],
    queryFn: async () => apiService.get('/debt-payments/debt/{debtId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
