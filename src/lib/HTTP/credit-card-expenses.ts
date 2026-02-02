import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import type {
  CreditCardExpensesPostCreditCardExpensesBody,
  CreditCardExpensesPutCreditCardExpensesByIdBody,
} from './Type/credit-card-expenses.type'

const BASE = '/credit-card-expenses' as const

export function useCreditCardExpensesPostCreditCardExpenses() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: CreditCardExpensesPostCreditCardExpensesBody) =>
      apiService.post('/credit-card-expenses', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card-expenses'] })
      success('Credit card expenses criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar credit card expenses')
    },
  })
}

export function useCreditCardExpensesGetCreditCardExpenses() {
  return useQuery({
    queryKey: ['credit-card-expenses-get'],
    queryFn: async () => apiService.get('/credit-card-expenses'),
    enabled: true,
  })
}

export function useCreditCardExpensesGetCreditCardExpensesById(params?: any) {
  return useQuery({
    queryKey: ['credit-card-expenses-get', params],
    queryFn: async () =>
      apiService.get('/credit-card-expenses/{id}'.replace('{id}', params.id)),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardExpensesPutCreditCardExpensesById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: CreditCardExpensesPutCreditCardExpensesByIdBody) =>
      apiService.put(
        '/credit-card-expenses/{id}'.replace('{id}', data.id || ''),
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card-expenses'] })
      success('Credit card expenses atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar credit card expenses')
    },
  })
}

export function useCreditCardExpensesDeleteCreditCardExpensesById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/credit-card-expenses/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-card-expenses'] })
      success('Credit card expenses deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar credit card expenses')
    },
  })
}

export function useCreditCardExpensesGetCreditCardExpensesCreditCardByCreditCardId(
  params?: any
) {
  return useQuery({
    queryKey: ['credit-card-expenses-get', params],
    queryFn: async () =>
      apiService.get(
        '/credit-card-expenses/credit-card/{creditCardId}'.replace(
          '{creditCardId}',
          params.creditCardId
        )
      ),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardExpensesGetCreditCardExpensesCategoryByCategoryId(
  params?: any
) {
  return useQuery({
    queryKey: ['credit-card-expenses-get', params],
    queryFn: async () =>
      apiService.get(
        '/credit-card-expenses/category/{categoryId}'.replace(
          '{categoryId}',
          params.categoryId
        )
      ),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
