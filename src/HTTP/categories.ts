import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";
import type { ApiResponse } from "./Type/response.type";
import type { categoryRequest, categoryResponse } from "./Type/categories.type";

const BASE = "/categories" as const;

export function useGetCategories() {
  return useQuery({
    queryKey: ["categories", "list"],
    queryFn: async () => apiService.get<categoryResponse[]>(BASE),
  });
}

export function useGetCategoryById(id: string) {
  return useQuery({
    queryKey: ["categories", "by-id", id],
    queryFn: async () => apiService.get<categoryResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useGetCategoriesByType(type: string) {
  return useQuery({
    queryKey: ["categories", "by-type", type],
    queryFn: async () => apiService.get<categoryResponse[]>(`${BASE}/type/${type}`),
    enabled: !!type,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories", "create"],
    mutationFn: async (data: categoryRequest) =>
      apiService.post<categoryResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories", "update", id],
    mutationFn: async (data: Partial<categoryRequest>) =>
      apiService.put<categoryResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", "by-id", id] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["categories", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
