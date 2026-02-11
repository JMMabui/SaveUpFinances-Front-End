import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { CategoriesGetResponseSchema, CategoriesGetByIdResponseSchema, CategoriesCreateBodySchema, CategoriesUpdateByIdBodySchema } from '@/lib/openapi/zod/Categories'

export function useCategoriesCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CategoriesCreateBodySchema.parse(data); let _path = '/categories';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
      success('Categories criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar categories')
    },
  })
}

export function useCategoriesGet() {
  return useQuery({
    queryKey: ['get-categories', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/categories'
      const _url = _path
      const res = await apiService.get(_url)
      return CategoriesGetResponseSchema.safeParse(res).success ? CategoriesGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useCategoriesGetById(params?: any) {
  return useQuery({
    queryKey: ['get-categories', params],
    queryFn: async (): Promise<any> => {
      const _path = '/categories/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return CategoriesGetByIdResponseSchema.safeParse(res).success ? CategoriesGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useCategoriesUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = CategoriesUpdateByIdBodySchema.parse(data); let _path = '/categories/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
      success('Categories atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar categories')
    },
  })
}

export function useCategoriesDeleteCateoriesById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/categories/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-categories'] })
      success('Categories deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar categories')
    },
  })
}

export { useCategoriesCreate as useCreateCategory }
export { useCategoriesUpdateById as useUpdateCategory }
export { useCategoriesDeleteCateoriesById as useDeleteCategory }
export { useCategoriesGet as useGetCategories }
export { useCategoriesGetById as useGetCategoriesById }
export { useCategoriesGetById as useGetCategoryById }
