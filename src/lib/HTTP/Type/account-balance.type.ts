import type { z } from 'zod'
import type { AccountsBalanceCreateAccountBalanceBodySchema } from '@/lib/openapi/zod/AccountsBalance'

export type accountBalanceRequest = z.infer<
  typeof AccountsBalanceCreateAccountBalanceBodySchema
>

export interface accountBalanceResponse {
  id: string
  accountId: string
  date: string
  balance: number
  createdAt: string
  updatedAt: string
}
