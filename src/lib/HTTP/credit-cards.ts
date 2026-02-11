import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { CreditCardsGetResponseSchema, CreditCardsGetByIdResponseSchema, CreditCardsGetByUserResponseSchema, CreditCardsCreateBodySchema, CreditCardsUpdateByIdBodySchema } from '@/lib/openapi/zod/CreditCards'

export function useCreditCardsCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CreditCardsCreateBodySchema.parse(data); let _path = '/credit-cards';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-cards'] })
      success('Credit cards criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar credit cards')
    },
  })
}

export function useCreditCardsGet() {
  return useQuery({
    queryKey: ['get-credit-cards', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-cards'
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardsGetResponseSchema.safeParse(res).success ? CreditCardsGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useCreditCardsGetById(params?: any) {
  return useQuery({
    queryKey: ['get-credit-cards', params],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-cards/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardsGetByIdResponseSchema.safeParse(res).success ? CreditCardsGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCreditCardsUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CreditCardsUpdateByIdBodySchema.parse(data); let _path = '/credit-cards/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-cards'] })
      success('Credit cards atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar credit cards')
    },
  })
}

export function useCreditCardsDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/credit-cards/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-credit-cards'] })
      success('Credit cards deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar credit cards')
    },
  })
}

export function useCreditCardsGetByUser(params?: any) {
  return useQuery({
    queryKey: ['get-credit-cards', params],
    queryFn: async (): Promise<any> => {
      const _path = '/credit-cards/user/{userId}'.replace('{userId}', encodeURIComponent(String((params ?? {})['userId'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CreditCardsGetByUserResponseSchema.safeParse(res).success ? CreditCardsGetByUserResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export { useCreditCardsCreate as useCreateCreditCard }
export { useCreditCardsUpdateById as useUpdateCreditCard }
export { useCreditCardsDeleteById as useDeleteCreditCard }
export { useCreditCardsGet as useGetCreditCards }
export { useCreditCardsGetById as useGetCreditCardsById }
export { useCreditCardsGetById as useGetCreditCardById }
export { useCreditCardsGetByUser as useGetCreditCardsByUser }