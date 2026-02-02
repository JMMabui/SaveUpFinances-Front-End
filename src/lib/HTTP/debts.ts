import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import {
  DebtsPostDebtsBodySchema,
  DebtsPutDebtsByIdBodySchema,
  type DebtsResponse,
} from './Type/debts.type'

const _BASE = '/debts' as const

export function useDebtsPostDebts() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/debts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Dívida criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar dívida')
    },
  })
}

export function useCreateDebt() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => {
      const parsed = DebtsPostDebtsBodySchema.parse(data)
      return apiService.post('/debts', parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Dívida criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar dívida')
    },
  })
}

export function useDebtsGetDebts(params?: any) {
  return useQuery({
    queryKey: ['debts-get', params],
    queryFn: async () => apiService.get('/debts'),
    enabled: true,
  })
}

export function useDebtsGetDebtsById(params?: any) {
  return useQuery({
    queryKey: ['debts-get', params],
    queryFn: async () => apiService.get(`/debts/${params?.id}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useDebtsPutDebtsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put(`/debts/${data?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Debts atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar debts')
    },
  })
}

export function useUpdateDebt(id: string) {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => {
      const parsed = DebtsPutDebtsByIdBodySchema.parse(data)
      return apiService.put(`/debts/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Dívida atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar dívida')
    },
  })
}

export function useDebtsDeleteDebtsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/debts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] })
      success('Debts deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar debts')
    },
  })
}

export function useDebtsGetDebtsUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['debts-get', params],
    queryFn: async () => apiService.get(`/debts/user/${params?.userId}`),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useGetDebtsByUser(userId: string) {
  return useQuery({
    queryKey: ['debts-by-user', userId],
    queryFn: async () =>
      apiService.get<DebtsResponse[]>(`/debts/user/${userId}`),
    enabled: !!userId,
  })
}
