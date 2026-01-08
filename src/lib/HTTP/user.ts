import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../apiServices";
import type { userRequest, userResponse, userUpdateRequest } from "./Type/user.type";

export function getUsers() {
  return useQuery({
    queryKey: ['get-users'],
    queryFn: async () => {
      return userService.getAll();
    },
  });
}

export function getUserById(id: string) {
  return useQuery({
    queryKey: ['get-user-by-id', id],
    queryFn: async () => {
      return userService.getById(id);
    },
    enabled: !!id, // Only run the query if id is provided
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-user'],
    mutationFn: async (data: userRequest | Partial<userRequest>) => userService.create(data as Partial<userResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
    },
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-user', id],
    mutationFn: async (data: userUpdateRequest) => userService.update(id, data as Partial<userResponse>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
      queryClient.invalidateQueries({ queryKey: ['get-user-by-id', id] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
    },
  });
}
