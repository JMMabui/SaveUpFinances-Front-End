import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";
import type { incomeSourceRequest, incomeSourceResponse } from "./Type/income-sources.type";

const BASE = "/income-sources" as const;

export function useGetIncomeSourcesByUser(userId: string) {
  return useQuery({
    queryKey: ["income-sources", "by-user", userId],
    queryFn: async () => apiService.get<incomeSourceResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetIncomeSourceById(id: string) {
  return useQuery({
    queryKey: ["income-sources", "by-id", id],
    queryFn: async () => apiService.get<incomeSourceResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateIncomeSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income-sources", "create"],
    mutationFn: async (data: incomeSourceRequest) => apiService.post<incomeSourceResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-sources"] });
    },
  });
}

export function useUpdateIncomeSource(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income-sources", "update", id],
    mutationFn: async (data: Partial<incomeSourceRequest>) => apiService.put<incomeSourceResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-sources"] });
      queryClient.invalidateQueries({ queryKey: ["income-sources", "by-id", id] });
    },
  });
}

export function useDeleteIncomeSource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income-sources", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income-sources"] });
    },
  });
}
