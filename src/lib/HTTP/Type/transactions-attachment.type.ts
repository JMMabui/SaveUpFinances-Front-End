// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:09.527Z
import { z } from 'zod'

export const TransactionsAttachmentPostTransactionAttachmentBodySchema =
  z.object({
    fileUrl: z.string(),
    fileType: z.string(),
    transactionId: z.string(),
    expensesId: z.union([z.string(), z.null()]).optional(),
  })
export type TransactionsAttachmentPostTransactionAttachmentBody = z.infer<
  typeof TransactionsAttachmentPostTransactionAttachmentBodySchema
>
export const TransactionsAttachmentPutTransactionAttachmentByIdBodySchema =
  z.object({
    fileUrl: z.string(),
    fileType: z.string(),
    transactionId: z.string(),
    expensesId: z.union([z.string(), z.null()]).optional(),
    id: z.string(),
  })
export type TransactionsAttachmentPutTransactionAttachmentByIdBody = z.infer<
  typeof TransactionsAttachmentPutTransactionAttachmentByIdBodySchema
>
