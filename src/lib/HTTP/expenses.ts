import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import {
  ExpensesPostExpensesBodySchema,
  ExpensesPutExpensesByIdBodySchema,
  type ExpensesResponse,
} from './Type/expenses.type'

const _BASE = '/expenses' as const

export function useExpensesPostExpenses() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/expenses', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Expenses criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar expenses')
    },
  })
}

export function useGetExpensesByUser(userId: string) {
  return useQuery({
    queryKey: ['expenses-get-user', userId],
    queryFn: async () =>
      apiService.get<ExpensesResponse[]>(`/expenses/user/${userId}`),
  })
}

export function useExpensesGetExpenses(params?: any) {
  return useQuery({
    queryKey: ['expenses-get', params],
    queryFn: async () => apiService.get<ExpensesResponse[]>('/expenses'),
    enabled: true,
  })
}

export function useExpensesGetExpensesById(params?: any) {
  return useQuery({
    queryKey: ['expenses-get', params],
    queryFn: async () => apiService.get(`/expenses/${params?.id}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useExpensesPutExpensesById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) =>
      apiService.put(`/expenses/${data?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Expenses atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar expenses')
    },
  })
}

export function useExpensesDeleteExpensesById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Expenses deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar expenses')
    },
  })
}

export function useExpensesGetExpensesUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['expenses-get', params],
    queryFn: async () => apiService.get(`/expenses/user/${params?.userId}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useExpensesGetExpensesCategoryByCategoryId(params?: any) {
  return useQuery({
    queryKey: ['expenses-get', params],
    queryFn: async () =>
      apiService.get(`/expenses/category/${params?.categoryId}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreateExpense() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => {
      const parsed = ExpensesPostExpensesBodySchema.parse(data)
      return apiService.post('/expenses', parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Despesa criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar despesa')
    },
  })
}

export function useUpdateExpense(id: string) {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => {
      const parsed = ExpensesPutExpensesByIdBodySchema.parse(data)
      return apiService.put(`/expenses/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Despesa atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar despesa')
    },
  })
}

export function useDeleteExpense() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Despesa deletada com sucesso')
    },
    onError: () => {
      error('Erro ao deletar despesa')
    },
  })
}
