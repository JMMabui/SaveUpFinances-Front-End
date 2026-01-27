import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import type { ApiResponse } from './Type/response.type'

const QUERY_KEY_ALL = ['categories'] as const

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => apiService.post('/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Categoria criada com sucesso')
    },
    onError: () => {
      error('Erro ao criar categoria')
    },
  })
}

export function useGetCategories() {
  return useQuery<ApiResponse<any[]>>({
    queryKey: QUERY_KEY_ALL,
    queryFn: async () => apiService.get<any[]>('/categories'),
  })
}

export function useGetCategoryById(id: string) {
  return useQuery<ApiResponse<any>>({
    queryKey: ['category-by-id', id],
    queryFn: async () => apiService.get<any>(`/categories/${id}`),
    enabled: !!id,
  })
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (data: any) => apiService.put(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Categoria atualizada com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar categoria')
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()
  return useMutation({
    mutationFn: async (id: string) => apiService.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY_ALL })
      success('Categoria deletada com sucesso')
    },
    onError: () => {
      error('Erro ao deletar categoria')
    },
  })
}
