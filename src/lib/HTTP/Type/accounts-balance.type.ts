// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:07.822Z
import { z } from 'zod'

export const AccountsBalancePostAccountBalanceBodySchema = z.object({
  accountId: z.string(),
  date: z.string(),
  balance: z.number(),
})
export type AccountsBalancePostAccountBalanceBody = z.infer<
  typeof AccountsBalancePostAccountBalanceBodySchema
>
export const AccountsBalancePutAccountBalanceByIdBodySchema = z.object({
  accountId: z.string().optional(),
  date: z.string().optional(),
  balance: z.number().optional(),
})
export type AccountsBalancePutAccountBalanceByIdBody = z.infer<
  typeof AccountsBalancePutAccountBalanceByIdBodySchema
>
