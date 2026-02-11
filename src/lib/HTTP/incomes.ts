import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { IncomesGetIncomeResponseSchema, IncomesGetIncomeByIdResponseSchema, IncomesGetIncomeByUserResponseSchema, IncomesGetIncomeSourceByIdResponseSchema, IncomesCreateIncomeBodySchema, IncomesUpdateIncomeByIdBodySchema } from '@/lib/openapi/zod/Incomes'

export function useIncomesCreateIncome() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = IncomesCreateIncomeBodySchema.parse(data); let _path = '/income';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-incomes'] })
      success('Incomes criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar incomes')
    },
  })
}

export function useIncomesGetIncome() {
  return useQuery({
    queryKey: ['get-incomes', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/income'
      const _url = _path
      const res = await apiService.get(_url)
      return IncomesGetIncomeResponseSchema.safeParse(res).success ? IncomesGetIncomeResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useIncomesGetIncomeById(params?: any) {
  return useQuery({
    queryKey: ['get-incomes', params],
    queryFn: async (): Promise<any> => {
      const _path = '/income/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return IncomesGetIncomeByIdResponseSchema.safeParse(res).success ? IncomesGetIncomeByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomesUpdateIncomeById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = IncomesUpdateIncomeByIdBodySchema.parse(data); let _path = '/income/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-incomes'] })
      success('Incomes atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar incomes')
    },
  })
}

export function useIncomesDeleteIncomeById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/income/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-incomes'] })
      success('Incomes deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar incomes')
    },
  })
}

export function useIncomesGetIncomeByUser(params?: any) {
  return useQuery({
    queryKey: ['get-incomes', params],
    queryFn: async (): Promise<any> => {
      const _path = '/income/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return IncomesGetIncomeByUserResponseSchema.safeParse(res).success ? IncomesGetIncomeByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useIncomesGetIncomeSourceById(params?: any) {
  return useQuery({
    queryKey: ['get-incomes', params],
    queryFn: async (): Promise<any> => {
      const _path = '/income/source/{sourceId}'.replace('{sourceId}', encodeURIComponent(String((params ?? {})['sourceId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return IncomesGetIncomeSourceByIdResponseSchema.safeParse(res).success ? IncomesGetIncomeSourceByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
