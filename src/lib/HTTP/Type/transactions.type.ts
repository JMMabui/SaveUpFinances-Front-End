import type { z } from 'zod'
import type { TransactionPostTransactionBodySchema } from '@/lib/openapi/zod/Transaction'

export interface TransactionResponse {
  id: string
  userId: string
  accountId: string
  date: string | Date
  description: string
  amount: number
  categoryId: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type TransactionRequest = z.infer<
  typeof TransactionPostTransactionBodySchema
>
