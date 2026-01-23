import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { userService } from '../apiServices'
import type {
  userRequest,
  userResponse,
  userUpdateRequest,
} from './Type/user.type'

export function getUsers() {
  return useQuery({
    queryKey: ['get-users'],
    queryFn: async () => {
      return userService.getAll()
    },
  })
}

export function getUserById(id: string) {
  return useQuery({
    queryKey: ['get-user-by-id', id],
    queryFn: async () => {
      return userService.getById(id)
    },
    enabled: !!id, // Only run the query if id is provided
  })
}

export function useCreateUser() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (data: userRequest | Partial<userRequest>) =>
      userService.create(data as Partial<userResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Usuário criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar usuário')
    },
  })
}

export function useUpdateUser(id: string) {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['update-user', id],
    mutationFn: async (data: userUpdateRequest) =>
      userService.update(id, data as Partial<userResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      queryClient.invalidateQueries({ queryKey: ['get-user-by-id', id] })
      success('Usuário atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar usuário')
    },
  })
}

export function useDeleteUser() {
  const { success, error } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Usuário excluído com sucesso')
    },
    onError: () => {
      error('Erro ao excluir usuário')
    },
  })
}
