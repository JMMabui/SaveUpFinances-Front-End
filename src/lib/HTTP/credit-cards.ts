import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'

const _BASE = '/creditcards' as const

export function useCreditCardsPostCreditCards() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.post('/credit-cards', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] })
      success('Credit cards criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar credit cards')
    },
  })
}

export function useCreditCardsGetCreditCards() {
  return useQuery({
    queryKey: ['credit-cards-get', params],
    queryFn: async () => apiService.get('/credit-cards'),
    enabled: true,
  })
}

export function useCreditCardsGetCreditCardsById(params?: any) {
  return useQuery({
    queryKey: ['credit-cards-get', params],
    queryFn: async () => apiService.get('/credit-cards/{id}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardsPutCreditCardsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => apiService.put('/credit-cards/{id}', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] })
      success('Credit cards atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar credit cards')
    },
  })
}

export function useCreditCardsDeleteCreditCardsById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) =>
      apiService.delete('/credit-cards/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-cards'] })
      success('Credit cards deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar credit cards')
    },
  })
}

export function useCreditCardsGetCreditCardsUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['credit-cards-get', params],
    queryFn: async () => apiService.get('/credit-cards/user/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
