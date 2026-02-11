import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { BudgetGetResponseSchema, BudgetGetByIdResponseSchema, BudgetGetByUserResponseSchema, BudgetCreateBodySchema, BudgetUpdateByIdBodySchema } from '@/lib/openapi/zod/Budget'

export function useBudgetCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = BudgetCreateBodySchema.parse(data); let _path = '/budget';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-budget'] })
      success('Budget criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar budget')
    },
  })
}

export function useBudgetGet() {
  return useQuery({
    queryKey: ['get-budget', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/budget'
      const _url = _path
      const res = await apiService.get(_url)
      return BudgetGetResponseSchema.safeParse(res).success ? BudgetGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useBudgetGetById(params?: any) {
  return useQuery({
    queryKey: ['get-budget', params],
    queryFn: async (): Promise<any> => {
      const _path = '/budget/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return BudgetGetByIdResponseSchema.safeParse(res).success ? BudgetGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useBudgetUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = BudgetUpdateByIdBodySchema.parse(data); let _path = '/budget/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-budget'] })
      success('Budget atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar budget')
    },
  })
}

export function useBudgetDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/budget/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-budget'] })
      success('Budget deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar budget')
    },
  })
}

export function useBudgetGetByUser(params?: any) {
  return useQuery({
    queryKey: ['get-budget', params],
    queryFn: async (): Promise<any> => {
      const _path = '/budget/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return BudgetGetByUserResponseSchema.safeParse(res).success ? BudgetGetByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useBudgetCreateGenerateRecurring() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { let _path = '/budget/generate-recurring';
      return apiService.post(_path, data) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-budget'] })
      success('Budget criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar budget')
    },
  })
}

export { useBudgetCreate as useCreateBudget }
export { useBudgetUpdateById as useUpdateBudget }
export { useBudgetDeleteById as useDeleteBudget }
export { useBudgetGet as useGetBudget }
export { useBudgetGetById as useGetBudgetById }
export { useBudgetGetByUser as useGetBudgetByUser }