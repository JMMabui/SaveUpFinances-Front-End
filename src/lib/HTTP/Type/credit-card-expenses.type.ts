// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.099Z
import { z } from 'zod'

export const CreditCardExpensesPostCreditCardExpensesBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  categoryId: z.string(),
  creditCardId: z.string(),
})
export type CreditCardExpensesPostCreditCardExpensesBody = z.infer<
  typeof CreditCardExpensesPostCreditCardExpensesBodySchema
>
export const CreditCardExpensesPutCreditCardExpensesByIdBodySchema = z.object({
  id: z.string().optional(),
  description: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  categoryId: z.string().optional(),
  creditCardId: z.string().optional(),
})
export type CreditCardExpensesPutCreditCardExpensesByIdBody = z.infer<
  typeof CreditCardExpensesPutCreditCardExpensesByIdBodySchema
>
