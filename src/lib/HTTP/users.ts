import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/toast'
import { apiService } from '../apiServices'
import { UsersGetResponseSchema, UsersGetByIdResponseSchema, UsersGetByIdProfileResponseSchema, UsersGetByIdSettingsResponseSchema, UsersCreateBodySchema, UsersUpdateByIdBodySchema, UsersUpdateByIdProfileBodySchema, UsersCreateByIdChangePasswordBodySchema, UsersUpdateByIdSettingsBodySchema } from '@/lib/openapi/zod/Users'

export function useUsersCreate() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = UsersCreateBodySchema.parse(data); let _path = '/users';
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar users')
    },
  })
}

export function useUsersGet() {
  return useQuery({
    queryKey: ['get-users', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/users'
      const _url = _path
      const res = await apiService.get(_url)
      return UsersGetResponseSchema.safeParse(res).success ? UsersGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useUsersGetById(params?: any) {
  return useQuery({
    queryKey: ['get-users', params],
    queryFn: async (): Promise<any> => {
      const _path = '/users/{id}'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return UsersGetByIdResponseSchema.safeParse(res).success ? UsersGetByIdResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersUpdateById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = UsersUpdateByIdBodySchema.parse(data); let _path = '/users/{id}';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}

export function useUsersDeleteById() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (id: string) => apiService.delete('/users/{id}'.replace('{id}', id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users deletado com sucesso')
    },
    onError: () => {
      error('Erro ao deletar users')
    },
  })
}

export function useUsersGetByIdProfile(params?: any) {
  return useQuery({
    queryKey: ['get-users', params],
    queryFn: async (): Promise<any> => {
      const _path = '/users/{id}/profile'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return UsersGetByIdProfileResponseSchema.safeParse(res).success ? UsersGetByIdProfileResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersUpdateByIdProfile() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = UsersUpdateByIdProfileBodySchema.parse(data); let _path = '/users/{id}/profile';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}

export function useUsersCreateByIdChangePassword() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = UsersCreateByIdChangePasswordBodySchema.parse(data); let _path = '/users/{id}/change-password';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.post(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users criado com sucesso')
    },
    onError: () => {
      error('Erro ao criar users')
    },
  })
}

export function useUsersGetByIdSettings(params?: any) {
  return useQuery({
    queryKey: ['get-users', params],
    queryFn: async (): Promise<any> => {
      const _path = '/users/{id}/settings'.replace('{id}', encodeURIComponent(String((params ?? {})['id'] ?? '')))
      const _url = _path
      const res = await apiService.get(_url)
      return UsersGetByIdSettingsResponseSchema.safeParse(res).success ? UsersGetByIdSettingsResponseSchema.parse(res) : res
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}

export function useUsersUpdateByIdSettings() {
  const queryClient = useQueryClient()
  const { success, error } = useToast()

  return useMutation({
    mutationFn: async (data: any) => { const parsed = UsersUpdateByIdSettingsBodySchema.parse(data); let _path = '/users/{id}/settings';
      _path = _path.replace('{id}', encodeURIComponent(String((data ?? {})['id'] ?? '')))
      return apiService.put(_path, parsed) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] })
      success('Users atualizado com sucesso')
    },
    onError: () => {
      error('Erro ao atualizar users')
    },
  })
}

export { useUsersCreate as useCreateUser }
export { useUsersUpdateById as useUpdateUser }
export { useUsersDeleteById as useDeleteUser }
export { useUsersGet as useGetUsers }
export { useUsersGetById as useGetUsersById }
export { useUsersGetById as useGetUserById }