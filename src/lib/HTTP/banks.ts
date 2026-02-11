import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { BanksGetResponseSchema, BanksGetByIdResponseSchema, BanksCreateBodySchema, BanksUpdateByIdBodySchema } from '@/lib/openapi/zod/Banks'

export function useBanksCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = BanksCreateBodySchema.parse(data); let _path = '/banks';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-banks'] })
      success('Banks criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar banks')
    },
  })
}

export function useBanksGet() {
  return useQuery({
    queryKey: ['get-banks', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/banks'
      const _url = _path
      const res = await apiService.get(_url)
      return BanksGetResponseSchema.safeParse(res).success ? BanksGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useBanksGetById(params?: any) {
  return useQuery({
    queryKey: ['get-banks', params],
    queryFn: async (): Promise<any> => {
      const _path = '/banks/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return BanksGetByIdResponseSchema.safeParse(res).success ? BanksGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useBanksUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = BanksUpdateByIdBodySchema.parse(data); let _path = '/banks/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-banks'] })
      success('Banks atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar banks')
    },
  })
}

export function useBanksDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/banks/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-banks'] })
      success('Banks deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar banks')
    },
  })
}

export { useBanksCreate as useCreateBank }
export { useBanksUpdateById as useUpdateBank }
export { useBanksDeleteById as useDeleteBank }
export { useBanksGet as useGetBanks }
export { useBanksGetById as useGetBanksById }
export { useBanksGetById as useGetBankById }