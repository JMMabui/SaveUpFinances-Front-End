// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.981Z
import { z } from 'zod'
import type { TransactionsGetTransactionByIdResponseSchema } from '@/lib/openapi/zod/Transactions'

export type TransactionsGetTransactionByIdResponse = z.infer<typeof TransactionsGetTransactionByIdResponseSchema>
export type TransactionResponse = TransactionsGetTransactionByIdResponse['data']