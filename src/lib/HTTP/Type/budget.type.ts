// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.154Z
import { z } from 'zod'

export const BudgetPostBudgetBodySchema = z.object({
  userId: z.string(),
  categoryId: z.string(),
  month: z.number(),
  year: z.number(),
  limit: z.number(),
})
export type BudgetPostBudgetBody = z.infer<typeof BudgetPostBudgetBodySchema>
export const BudgetPutBudgetByIdBodySchema = z.object({
  userId: z.string().optional(),
  categoryId: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  limit: z.number().optional(),
})
export type BudgetPutBudgetByIdBody = z.infer<
  typeof BudgetPutBudgetByIdBodySchema
>
