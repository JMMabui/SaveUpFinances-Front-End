import { useQuery } from "@tanstack/react-query";
import { userService } from "../lib/apiServices";

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
