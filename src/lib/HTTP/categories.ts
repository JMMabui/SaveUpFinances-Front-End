import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import {
  CategoriesPostCategoriesBodySchema,
  CategoriesPutCategoriesByIdBodySchema,
} from '@/lib/openapi/zod/Categories'
import { apiService } from '../apiServices'
import type { categoryRequest, categoryResponse } from './Type/categories.type'

const BASE = '/categories' as const

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories', 'list'],
    queryFn: async () => apiService.get<categoryResponse[]>(BASE),
  })
}

export function useGetCategoryById(id: string) {
  return useQuery({
    queryKey: ['categories', 'by-id', id],
    queryFn: async () => apiService.get<categoryResponse>(`${BASE}/${id}`),
    enabled: !!id,
  })
}

export function useGetCategoriesByType(type: string) {
  return useQuery({
    queryKey: ['categories', 'by-type', type],
    queryFn: async () =>
      apiService.get<categoryResponse[]>(`${BASE}/type/${type}`),
    enabled: !!type,
  })
}

export function useCreateCategory() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['categories', 'create'],
    mutationFn: async (data: categoryRequest) => {
      const parsed = CategoriesPostCategoriesBodySchema.parse(data)
      return apiService.post<categoryResponse>(BASE, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      success('Categoria criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar categoria')
    },
  })
}

export function useUpdateCategory(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['categories', 'update', id],
    mutationFn: async (data: Partial<categoryRequest>) => {
      const parsed = CategoriesPutCategoriesByIdBodySchema.parse(data)
      return apiService.put<categoryResponse>(`${BASE}/${id}`, parsed)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories', 'by-id', id] })
      success('Categoria atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar categoria')
    },
  })
}

export function useDeleteCategory() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['categories', 'delete'],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      success('Categoria excluída com sucesso')
    },
    onError: () => {
      error('Erro ao excluir categoria')
    },
  })
}
