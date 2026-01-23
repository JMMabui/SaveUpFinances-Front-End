import type { z } from 'zod'
import type { AccountsBalancePostAccountBalanceBodySchema } from '@/lib/openapi/zod/AccountsBalance'

export type accountBalanceRequest = z.infer<
  typeof AccountsBalancePostAccountBalanceBodySchema
>

export interface accountBalanceResponse {
  id: string
  accountId: string
  date: string
  balance: number
  createdAt: string
  updatedAt: string
}
