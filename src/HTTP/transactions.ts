import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../lib/apiServices";

// Tipos mínimos inferidos (ajuste quando o arquivo Type/transactions.type.ts for definido)
export interface TransactionResponse {
  id: string;
  userId: string;
  accountId: string;
  date: string | Date;
  description: string;
  amount: number;
  categoryId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface TransactionRequest {
  userId: string;
  accountId: string;
  date: string | Date;
  description: string;
  amount: number;
  categoryId: string;
}

const BASE = "/transactions" as const;

export function useGetTransactionsByUser(userId: string) {
  return useQuery({
    queryKey: ["transactions", "by-user", userId],
    queryFn: async () => apiService.get<TransactionResponse[]>(`${BASE}/user/${userId}`),
    enabled: !!userId,
  });
}

export function useGetTransactionsByAccount(accountId: string) {
  return useQuery({
    queryKey: ["transactions", "by-account", accountId],
    queryFn: async () => apiService.get<TransactionResponse[]>(`${BASE}/account/${accountId}`),
    enabled: !!accountId,
  });
}

export function useGetTransactionById(id: string) {
  return useQuery({
    queryKey: ["transactions", "by-id", id],
    queryFn: async () => apiService.get<TransactionResponse>(`${BASE}/${id}`),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: async (data: TransactionRequest) => apiService.post<TransactionResponse>(BASE, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useUpdateTransaction(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", "update", id],
    mutationFn: async (data: Partial<TransactionRequest>) => apiService.put<TransactionResponse>(`${BASE}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", "by-id", id] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["transactions", "delete"],
    mutationFn: async (id: string) => apiService.delete<void>(`${BASE}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
