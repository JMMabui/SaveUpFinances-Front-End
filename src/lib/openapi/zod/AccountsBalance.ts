import { z } from 'zod'
export const AccountsBalancePostAccountBalanceBodySchema = z.object({
  accountId: z.string(),
  date: z.string(),
  balance: z.number(),
})
export const AccountsBalancePostAccountBalanceResponseSchema = z.unknown()
export const AccountsBalanceGetAccountBalanceBodySchema = z.unknown()
export const AccountsBalanceGetAccountBalanceResponseSchema = z.unknown()
export const AccountsBalanceGetAccountBalanceByIdBodySchema = z.unknown()
export const AccountsBalanceGetAccountBalanceByIdResponseSchema = z.unknown()
export const AccountsBalancePutAccountBalanceByIdBodySchema = z.object({
  accountId: z.string().optional(),
  date: z.string().optional(),
  balance: z.number().optional(),
})
export const AccountsBalancePutAccountBalanceByIdResponseSchema = z.unknown()
export const AccountsBalanceDeleteAccountBalanceByIdBodySchema = z.unknown()
export const AccountsBalanceDeleteAccountBalanceByIdResponseSchema = z.unknown()
export const AccountsBalanceGetAccountBalanceAccountByAccountIdBodySchema =
  z.unknown()
export const AccountsBalanceGetAccountBalanceAccountByAccountIdResponseSchema =
  z.unknown()
