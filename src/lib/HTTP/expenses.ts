import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'create'],
    mutationFn: async (data: expensesRequest) =>
      apiService.post<expensesResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}

export function useUpdateExpense(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'update', id],
    mutationFn: async (data: Partial<expensesRequest>) =>
      apiService.put<expensesResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['expenses', 'by-id', id] })
    },
  })
}

export function useDeleteExpense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['expenses', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })
}
