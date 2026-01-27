// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.330Z
import { z } from 'zod'

export const DebtPaymentsPostDebtPaymentsBodySchema = z.object({
  amount: z.number(),
  date: z.string(),
  debtId: z.string(),
  accountId: z.union([z.string(), z.null()]).optional(),
  userId: z.string(),
  notes: z.union([z.string(), z.null()]).optional(),
})
export type DebtPaymentsPostDebtPaymentsBody = z.infer<
  typeof DebtPaymentsPostDebtPaymentsBodySchema
>
export const DebtPaymentsPutDebtPaymentsByIdBodySchema = z.object({
  amount: z.number().optional(),
  date: z.string().optional(),
  debtId: z.string().optional(),
  accountId: z.union([z.string(), z.null()]).optional(),
  userId: z.string().optional(),
  notes: z.union([z.string(), z.null()]).optional(),
})
export type DebtPaymentsPutDebtPaymentsByIdBody = z.infer<
  typeof DebtPaymentsPutDebtPaymentsByIdBodySchema
>
