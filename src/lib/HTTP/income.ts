import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../apiServices";
import type { incomeRequest, incomeResponse } from "./Type/income.type";

const BASE = "/income" as const;

export function useGetIncomeByUser(userId: string) {
  return useQuery({
    queryKey: ["income", "by-user", userId],
    queryFn: async () => apiService.get<incomeResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetIncomeById(id: string) {
  return useQuery({
    queryKey: ["income", "by-id", id],
    queryFn: async () => apiService.get<incomeResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateIncome() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income", "create"],
    mutationFn: async (data: incomeRequest) => apiService.post<incomeResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
  });
}

export function useUpdateIncome(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income", "update", id],
    mutationFn: async (data: Partial<incomeRequest>) => apiService.put<incomeResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["income", "by-id", id] });
    },
  });
}

export function useDeleteIncome() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["income", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
    },
  });
}
