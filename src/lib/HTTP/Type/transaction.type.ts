// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.900Z
import { z } from 'zod'
import type { TransactionCreateBodySchema, TransactionCreateResponseSchema, TransactionGetTransactionsResponseSchema, TransactionUpdateByIdBodySchema, TransactionUpdateByIdResponseSchema, TransactionDeleteByIdResponseSchema, TransactionGetTransactionsByAccountResponseSchema, TransactionGetTransactionsByCategoryResponseSchema, TransactionGetTransactionsByUserResponseSchema, TransactionGetTransactionsTypeByTypeResponseSchema } from '@/lib/openapi/zod/Transaction'

export type TransactionCreateResponse = z.infer<typeof TransactionCreateResponseSchema>
export type TransactionGetTransactionsResponse = z.infer<typeof TransactionGetTransactionsResponseSchema>
export type TransactionUpdateByIdResponse = z.infer<typeof TransactionUpdateByIdResponseSchema>
export type TransactionDeleteByIdResponse = z.infer<typeof TransactionDeleteByIdResponseSchema>
export type TransactionGetTransactionsByAccountResponse = z.infer<typeof TransactionGetTransactionsByAccountResponseSchema>
export type TransactionGetTransactionsByCategoryResponse = z.infer<typeof TransactionGetTransactionsByCategoryResponseSchema>
export type TransactionGetTransactionsByUserResponse = z.infer<typeof TransactionGetTransactionsByUserResponseSchema>
export type TransactionGetTransactionsTypeByTypeResponse = z.infer<typeof TransactionGetTransactionsTypeByTypeResponseSchema>
export type TransactionCreateBody = z.infer<typeof TransactionCreateBodySchema>
export type TransactionUpdateByIdBody = z.infer<typeof TransactionUpdateByIdBodySchema>