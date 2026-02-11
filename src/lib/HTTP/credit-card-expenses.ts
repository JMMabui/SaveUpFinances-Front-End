import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { CreditCardExpensesGetResponseSchema, CreditCardExpensesGetByIdResponseSchema, CreditCardExpensesGetByCreditCardResponseSchema, CreditCardExpensesGetByCategoryResponseSchema, CreditCardExpensesCreateBodySchema, CreditCardExpensesUpdateByIdBodySchema } from '@/lib/openapi/zod/CreditCardExpenses'

export function useCreditCardExpensesCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CreditCardExpensesCreateBodySchema.parse(data); let _path = '/credit-card-expenses';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-card-expenses'] })
      success('Credit card expenses criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar credit card expenses')
    },
  })
}

export function useCreditCardExpensesGet() {
  return useQuery({
    queryKey: ['get-credit-card-expenses', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-card-expenses'
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardExpensesGetResponseSchema.safeParse(res).success ? CreditCardExpensesGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useCreditCardExpensesGetById(params?: any) {
  return useQuery({
    queryKey: ['get-credit-card-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-card-expenses/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardExpensesGetByIdResponseSchema.safeParse(res).success ? CreditCardExpensesGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardExpensesUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CreditCardExpensesUpdateByIdBodySchema.parse(data); let _path = '/credit-card-expenses/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-card-expenses'] })
      success('Credit card expenses atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar credit card expenses')
    },
  })
}

export function useCreditCardExpensesDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/credit-card-expenses/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-card-expenses'] })
      success('Credit card expenses deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar credit card expenses')
    },
  })
}

export function useCreditCardExpensesGetByCreditCard(params?: any) {
  return useQuery({
    queryKey: ['get-credit-card-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-card-expenses/credit-card/{creditCardId}'.replace('{creditCardId}', encodeURIComponent(String((params ?? {})['creditCardId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardExpensesGetByCreditCardResponseSchema.safeParse(res).success ? CreditCardExpensesGetByCreditCardResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardExpensesGetByCategory(params?: any) {
  return useQuery({
    queryKey: ['get-credit-card-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-card-expenses/category/{categoryId}'.replace('{categoryId}', encodeURIComponent(String((params ?? {})['categoryId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardExpensesGetByCategoryResponseSchema.safeParse(res).success ? CreditCardExpensesGetByCategoryResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useCreditCardExpensesCreate as useCreateCreditCardExpense }
export { useCreditCardExpensesUpdateById as useUpdateCreditCardExpense }
export { useCreditCardExpensesDeleteById as useDeleteCreditCardExpense }
export { useCreditCardExpensesGet as useGetCreditCardExpenses }
export { useCreditCardExpensesGetById as useGetCreditCardExpensesById }
export { useCreditCardExpensesGetById as useGetCreditCardExpenseById }