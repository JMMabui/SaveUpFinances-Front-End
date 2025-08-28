import { useQuery } from "@tanstack/react-query";
import { accountService } from "../lib/apiServices";

export function getAccountsByUserId(userId: string) {
  return useQuery({
    queryKey: ['get-accounts', userId],
    queryFn: async () => {
      return accountService.getByUserId(userId);
    },
  });
}