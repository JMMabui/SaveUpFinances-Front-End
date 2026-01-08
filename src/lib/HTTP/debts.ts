import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../apiServices";
import type { debtsRequest, debtsResponse } from "./Type/debts.type";

const BASE = "/debts" as const;

export function useGetDebtsByUser(userId: string) {
  return useQuery({
    queryKey: ["debts", "by-user", userId],
    queryFn: async () => apiService.get<debtsResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetDebtById(id: string) {
  return useQuery({
    queryKey: ["debts", "by-id", id],
    queryFn: async () => apiService.get<debtsResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateDebt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["debts", "create"],
    mutationFn: async (data: debtsRequest) => apiService.post<debtsResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });
}

export function useUpdateDebt(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["debts", "update", id],
    mutationFn: async (data: Partial<debtsRequest>) => apiService.put<debtsResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
      queryClient.invalidateQueries({ queryKey: ["debts", "by-id", id] });
    },
  });
}

export function useDeleteDebt() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["debts", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });
}
