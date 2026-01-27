// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.752Z
import { z } from 'zod'

export const IncomesPostIncomeBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  sourceId: z.string(),
  accountId: z.string().optional(),
  date: z.string(),
  userId: z.string(),
})
export type IncomesPostIncomeBody = z.infer<typeof IncomesPostIncomeBodySchema>
export const IncomesPutIncomeByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  sourceId: z.string().optional(),
  accountId: z.string().optional(),
  date: z.string().optional(),
  userId: z.string().optional(),
})
export type IncomesPutIncomeByIdBody = z.infer<
  typeof IncomesPutIncomeByIdBodySchema
>
