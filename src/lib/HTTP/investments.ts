import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { InvestmentsGetInvestmentResponseSchema, InvestmentsGetInvestmentByUserResponseSchema, InvestmentsCreateInvestmentBodySchema, InvestmentsUpdateInvestmentByIdBodySchema } from '@/lib/openapi/zod/Investments'

export function useInvestmentsCreateInvestment() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = InvestmentsCreateInvestmentBodySchema.parse(data); let _path = '/investment';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investments'] })
      success('Investments criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar investments')
    },
  })
}

export function useInvestmentsGetInvestment() {
  return useQuery({
    queryKey: ['get-investments', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/investment'
      const _url = _path
      const res = await apiService.get(_url)
      return InvestmentsGetInvestmentResponseSchema.safeParse(res).success ? InvestmentsGetInvestmentResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useInvestmentsGetInvestmentByUser(params?: any) {
  return useQuery({
    queryKey: ['get-investments', params],
    queryFn: async (): Promise<any> => {
      const _path = '/investment/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return InvestmentsGetInvestmentByUserResponseSchema.safeParse(res).success ? InvestmentsGetInvestmentByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useInvestmentsUpdateInvestmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = InvestmentsUpdateInvestmentByIdBodySchema.parse(data); let _path = '/investment/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investments'] })
      success('Investments atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar investments')
    },
  })
}

export function useInvestmentsDeleteInvestmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/investment/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-investments'] })
      success('Investments deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar investments')
    },
  })
}
