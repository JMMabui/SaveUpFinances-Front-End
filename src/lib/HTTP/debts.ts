import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { DebtsGetResponseSchema, DebtsGetByIdResponseSchema, DebtsGetByUserResponseSchema, DebtsCreateBodySchema, DebtsUpdateByIdBodySchema } from '@/lib/openapi/zod/Debts'

export function useDebtsCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = DebtsCreateBodySchema.parse(data); let _path = '/debts';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debts'] })
      success('Debts criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar debts')
    },
  })
}

export function useDebtsGet(params?: any) {
  return useQuery({
    queryKey: ['get-debts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/debts'
      const _usp = new URLSearchParams()
      if ((params ?? {})['page'] !== undefined && (params ?? {})['page'] !== null) { _usp.append('page', String((params ?? {})['page'])) }
      if ((params ?? {})['pageSize'] !== undefined && (params ?? {})['pageSize'] !== null) { _usp.append('pageSize', String((params ?? {})['pageSize'])) }
      if ((params ?? {})['userId'] !== undefined && (params ?? {})['userId'] !== null) { _usp.append('userId', String((params ?? {})['userId'])) }
      if ((params ?? {})['status'] !== undefined && (params ?? {})['status'] !== null) { _usp.append('status', String((params ?? {})['status'])) }
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return DebtsGetResponseSchema.safeParse(res).success ? DebtsGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useDebtsGetById(params?: any) {
  return useQuery({
    queryKey: ['get-debts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/debts/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return DebtsGetByIdResponseSchema.safeParse(res).success ? DebtsGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useDebtsUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = DebtsUpdateByIdBodySchema.parse(data); let _path = '/debts/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debts'] })
      success('Debts atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar debts')
    },
  })
}

export function useDebtsDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/debts/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-debts'] })
      success('Debts deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar debts')
    },
  })
}

export function useDebtsGetByUser(params?: any) {
  return useQuery({
    queryKey: ['get-debts', params],
    queryFn: async (): Promise<any> => {
      const _path = '/debts/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return DebtsGetByUserResponseSchema.safeParse(res).success ? DebtsGetByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useDebtsCreate as useCreateDebt }
export { useDebtsUpdateById as useUpdateDebt }
export { useDebtsDeleteById as useDeleteDebt }
export { useDebtsGet as useGetDebts }
export { useDebtsGetById as useGetDebtsById }
export { useDebtsGetById as useGetDebtById }
export { useDebtsGetByUser as useGetDebtsByUser }