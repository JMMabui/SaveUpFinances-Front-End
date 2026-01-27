import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { banksService } from '../apiServices'

const QUERY_KEY_ALL = ['banks'] as const

export function useBanksPostBanks() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => banksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Banco criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar banco')
    },
  })
}

export function useGetBanks() {
  return useQuery({
    queryKey: QUERY_KEY_ALL,
    queryFn: async () => banksService.getAll(),
  })
}

export function useBanksGetBanksById(id?: string) {
  return useQuery({
    queryKey: ['bank-by-id', id],
    queryFn: async () => banksService.getById(id as string),
    enabled: !!id,
  })
}

export function useBanksPutBanksById(id: string) {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => banksService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Banco atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar banco')
    },
  })
}

export function useBanksDeleteBanksById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (id: string) => banksService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Banco deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar banco')
    },
  })
}
