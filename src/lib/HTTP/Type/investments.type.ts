// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:09.232Z
import { z } from 'zod'

export const InvestmentsPostInvestmentBodySchema = z.object({
  investimentName: z.string(),
  amount: z.number(),
  investmentTypeId: z.string(),
  investmentGoalId: z.union([z.string(), z.null()]).optional(),
  notes: z.union([z.string(), z.null()]).optional(),
  userId: z.string(),
})
export type InvestmentsPostInvestmentBody = z.infer<
  typeof InvestmentsPostInvestmentBodySchema
>
export const InvestmentsPutInvestmentByIdBodySchema = z.object({
  investimentName: z.string().optional(),
  amount: z.number().optional(),
  investmentTypeId: z.string().optional(),
  investmentGoalId: z.union([z.string(), z.null()]).optional(),
  notes: z.union([z.string(), z.null()]).optional(),
  userId: z.string().optional(),
})
export type InvestmentsPutInvestmentByIdBody = z.infer<
  typeof InvestmentsPutInvestmentByIdBodySchema
>
