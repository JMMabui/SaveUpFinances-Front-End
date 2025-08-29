import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";
import type { investmentRequest, investmentResponse } from "./Type/investment-goal.type";

const BASE = "/investment-goal" as const;

export function useGetInvestmentGoalsByUser(userId: string) {
  return useQuery({
    queryKey: ["investment-goal", "by-user", userId],
    queryFn: async () => apiService.get<investmentResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetInvestmentGoalById(id: string) {
  return useQuery({
    queryKey: ["investment-goal", "by-id", id],
    queryFn: async () => apiService.get<investmentResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateInvestmentGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["investment-goal", "create"],
    mutationFn: async (data: investmentRequest) => apiService.post<investmentResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investment-goal"] });
    },
  });
}

export function useUpdateInvestmentGoal(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["investment-goal", "update", id],
    mutationFn: async (data: Partial<investmentRequest>) => apiService.put<investmentResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investment-goal"] });
      queryClient.invalidateQueries({ queryKey: ["investment-goal", "by-id", id] });
    },
  });
}

export function useDeleteInvestmentGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["investment-goal", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investment-goal"] });
    },
  });
}
