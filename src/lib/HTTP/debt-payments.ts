import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { DebtPaymentsGetResponseSchema, DebtPaymentsGetByIdResponseSchema, DebtPaymentsGetDebtByIdResponseSchema, DebtPaymentsCreateBodySchema, DebtPaymentsUpdateByIdBodySchema } from '@/lib/openapi/zod/DebtPayments'

export function useDebtPaymentsCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = DebtPaymentsCreateBodySchema.parse(data); let _path = '/debt-payments';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debt-payments'] })
      success('Debt payments criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar debt payments')
    },
  })
}

export function useDebtPaymentsGet() {
  return useQuery({
    queryKey: ['get-debt-payments', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/debt-payments'
      const _url = _path
      const res = await apiService.get(_url)
      return DebtPaymentsGetResponseSchema.safeParse(res).success ? DebtPaymentsGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useDebtPaymentsGetById(params?: any) {
  return useQuery({
    queryKey: ['get-debt-payments', params],
    queryFn: async (): Promise<any> => {
      const _path = '/debt-payments/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return DebtPaymentsGetByIdResponseSchema.safeParse(res).success ? DebtPaymentsGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useDebtPaymentsUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = DebtPaymentsUpdateByIdBodySchema.parse(data); let _path = '/debt-payments/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debt-payments'] })
      success('Debt payments atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar debt payments')
    },
  })
}

export function useDebtPaymentsDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/debt-payments/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debt-payments'] })
      success('Debt payments deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar debt payments')
    },
  })
}

export function useDebtPaymentsGetDebtById(params?: any) {
  return useQuery({
    queryKey: ['get-debt-payments', params],
    queryFn: async (): Promise<any> => {
      const _path = '/debt-payments/debt/{debtId}'.replace('{debtId}', encodeURIComponent(String((params ?? {})['debtId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return DebtPaymentsGetDebtByIdResponseSchema.safeParse(res).success ? DebtPaymentsGetDebtByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useDebtPaymentsCreate as useCreateDebtPayment }
export { useDebtPaymentsUpdateById as useUpdateDebtPayment }
export { useDebtPaymentsDeleteById as useDeleteDebtPayment }
export { useDebtPaymentsGet as useGetDebtPayments }
export { useDebtPaymentsGetById as useGetDebtPaymentsById }
export { useDebtPaymentsGetById as useGetDebtPaymentById }