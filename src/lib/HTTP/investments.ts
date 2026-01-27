import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/investments' as const

export function useInvestmentsPostInvestment() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/investment', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] })
      success('Investments criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar investments')
    },
  })
}

export function useInvestmentsGetInvestment() {
  return useQuery({
    queryKey: ['investments-get', params],
    queryFn: async () => apiService.get('/investment'),
    enabled: true,
  })
}

export function useInvestmentsGetInvestmentUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['investments-get', params],
    queryFn: async () => apiService.get('/investment/user/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useInvestmentsPutInvestmentById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/investment/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] })
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
    mutationFn: async (id: string) =>
      apiService.delete('/investment/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] })
      success('Investments deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar investments')
    },
  })
}
