import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { IncomeSourceGetResponseSchema, IncomeSourceGetByIdResponseSchema, IncomeSourceGetIncomeSourcesByUserResponseSchema, IncomeSourceCreateBodySchema, IncomeSourceUpdateByIdBodySchema } from '@/lib/openapi/zod/IncomeSource'

export function useIncomeSourceCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = IncomeSourceCreateBodySchema.parse(data); let _path = '/income-source';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-income-source'] })
      success('Income source criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar income source')
    },
  })
}

export function useIncomeSourceGet() {
  return useQuery({
    queryKey: ['get-income-source', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/income-source'
      const _url = _path
      const res = await apiService.get(_url)
      return IncomeSourceGetResponseSchema.safeParse(res).success ? IncomeSourceGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useIncomeSourceGetById(params?: any) {
  return useQuery({
    queryKey: ['get-income-source', params],
    queryFn: async (): Promise<any> => {
      const _path = '/income-source/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return IncomeSourceGetByIdResponseSchema.safeParse(res).success ? IncomeSourceGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomeSourceUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = IncomeSourceUpdateByIdBodySchema.parse(data); let _path = '/income-source/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-income-source'] })
      success('Income source atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar income source')
    },
  })
}

export function useIncomeSourceDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/income-source/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-income-source'] })
      success('Income source deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar income source')
    },
  })
}

export function useIncomeSourceGetIncomeSourcesByUser(params?: any) {
  return useQuery({
    queryKey: ['get-income-source', params],
    queryFn: async (): Promise<any> => {
      const _path = '/income-sources/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return IncomeSourceGetIncomeSourcesByUserResponseSchema.safeParse(res).success ? IncomeSourceGetIncomeSourcesByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useIncomeSourceCreate as useCreateIncomeSource }
export { useIncomeSourceUpdateById as useUpdateIncomeSource }
export { useIncomeSourceDeleteById as useDeleteIncomeSource }
export { useIncomeSourceGet as useGetIncomeSource }
export { useIncomeSourceGetById as useGetIncomeSourceById }