import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";
import type { budgetRequest, budgetResponse, budgetUpdateRequest } from "./Type/budget.type";

const BASE = "/budget" as const;

export function useGetBudgetsByUser(userId: string) {
  return useQuery({
    queryKey: ["budget", "by-user", userId],
    queryFn: async () => apiService.get<budgetResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetBudgetById(id: string) {
  return useQuery({
    queryKey: ["budget", "by-id", id],
    queryFn: async () => apiService.get<budgetResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["budget", "create"],
    mutationFn: async (data: budgetRequest) => apiService.post<budgetResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });
}

export function useUpdateBudget(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["budget", "update", id],
    mutationFn: async (data: budgetUpdateRequest) => apiService.put<budgetResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["budget", "by-id", id] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["budget", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });
}
