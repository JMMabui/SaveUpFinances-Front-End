import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { ExpensesGetResponseSchema, ExpensesGetByIdResponseSchema, ExpensesGetByUserResponseSchema, ExpensesGetByCategoryResponseSchema, ExpensesCreateBodySchema, ExpensesUpdateByIdBodySchema } from '@/lib/openapi/zod/Expenses'

export function useExpensesCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = ExpensesCreateBodySchema.parse(data); let _path = '/expenses';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-expenses'] })
      success('Expenses criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar expenses')
    },
  })
}

export function useExpensesGet(params?: any) {
  return useQuery({
    queryKey: ['get-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/expenses'
      const _usp = new URLSearchParams()
      if ((params ?? {})['page'] !== undefined && (params ?? {})['page'] !== null) { _usp.append('page', String((params ?? {})['page'])) }
      if ((params ?? {})['pageSize'] !== undefined && (params ?? {})['pageSize'] !== null) { _usp.append('pageSize', String((params ?? {})['pageSize'])) }
      if ((params ?? {})['userId'] !== undefined && (params ?? {})['userId'] !== null) { _usp.append('userId', String((params ?? {})['userId'])) }
      if ((params ?? {})['categoryId'] !== undefined && (params ?? {})['categoryId'] !== null) { _usp.append('categoryId', String((params ?? {})['categoryId'])) }
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ExpensesGetResponseSchema.safeParse(res).success ? ExpensesGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useExpensesGetById(params?: any) {
  return useQuery({
    queryKey: ['get-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/expenses/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return ExpensesGetByIdResponseSchema.safeParse(res).success ? ExpensesGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useExpensesUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = ExpensesUpdateByIdBodySchema.parse(data); let _path = '/expenses/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-expenses'] })
      success('Expenses atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar expenses')
    },
  })
}

export function useExpensesDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/expenses/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-expenses'] })
      success('Expenses deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar expenses')
    },
  })
}

export function useExpensesGetByUser(params?: any) {
  return useQuery({
    queryKey: ['get-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/expenses/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return ExpensesGetByUserResponseSchema.safeParse(res).success ? ExpensesGetByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useExpensesGetByCategory(params?: any) {
  return useQuery({
    queryKey: ['get-expenses', params],
    queryFn: async (): Promise<any> => {
      const _path = '/expenses/category/{categoryId}'.replace('{categoryId}', encodeURIComponent(String((params ?? {})['categoryId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return ExpensesGetByCategoryResponseSchema.safeParse(res).success ? ExpensesGetByCategoryResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useExpensesCreate as useCreateExpense }
export { useExpensesUpdateById as useUpdateExpense }
export { useExpensesDeleteById as useDeleteExpense }
export { useExpensesGet as useGetExpenses }
export { useExpensesGetById as useGetExpensesById }
export { useExpensesGetById as useGetExpenseById }
export { useExpensesGetByUser as useGetExpensesByUser }