import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";
import type { creditCardRequest, creditCardResponse } from "./Type/credit-card.type";

const BASE = "/credit-card" as const;

export function useGetCreditCardsByUser(userId: string) {
  return useQuery({
    queryKey: ["credit-card", "by-user", userId],
    queryFn: async () => apiService.get<creditCardResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetCreditCardById(id: string) {
  return useQuery({
    queryKey: ["credit-card", "by-id", id],
    queryFn: async () => apiService.get<creditCardResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateCreditCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["credit-card", "create"],
    mutationFn: async (data: creditCardRequest) => apiService.post<creditCardResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-card"] });
    },
  });
}

export function useUpdateCreditCard(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["credit-card", "update", id],
    mutationFn: async (data: Partial<creditCardRequest>) => apiService.put<creditCardResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-card"] });
      queryClient.invalidateQueries({ queryKey: ["credit-card", "by-id", id] });
    },
  });
}

export function useDeleteCreditCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["credit-card", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-card"] });
    },
  });
}
