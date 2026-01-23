import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  ExpensesPostExpensesBodySchema,
  ExpensesPutExpensesByIdBodySchema,
} from '@/lib/openapi/zod/Expenses'
import { apiService } from '../apiServices'
import type { expensesRequest, expensesResponse } from './Type/expenses.type'

const BASE = '/expenses' as const

export function useGetExpensesByUser(userId: string) {
  return useQuery({
    queryKey: ['expenses', 'by-user', userId],
    queryFn: async () =>
      apiService.get<expensesResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  })
}

export function useGetExpenseById(id: string) {
  return useQuery({
    queryKey: ['expenses', 'by-id', id],
    queryFn: async () => apiService.get<expensesResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useCreateExpense() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'create'],
    mutationFn: async (data: expensesRequest) => {
      console.log('Creating expense with data:', data)
      const parsed = ExpensesPostExpensesBodySchema.parse(data)
      return apiService.post<expensesResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Despesa criada', 'A despesa foi registada com sucesso.')
    },
    onError: () => {
      error('Falha ao criar despesa', 'Verifique os dados e tente novamente.')
    },
  })
}

export function useUpdateExpense(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'update', id],
    mutationFn: async (data: Partial<expensesRequest>) => {
      const parsed = ExpensesPutExpensesByIdBodySchema.parse(data)
      return apiService.put<expensesResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expenses', 'by-id', id] })
      success('Despesa atualizada', 'Alterações guardadas com sucesso.')
    },
    onError: () => {
      error('Falha ao atualizar despesa', 'Tente novamente mais tarde.')
    },
  })
}

export function useDeleteExpense() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      success('Despesa removida', 'A despesa foi apagada com sucesso.')
    },
    onError: () => {
      error('Falha ao remover despesa', 'Tente novamente mais tarde.')
    },
  })
}
