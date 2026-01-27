// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:09.390Z
import { z } from 'zod'

export const InvestmentGoalsPostInvestmentGoalBodySchema = z.object({
  name: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number().optional(),
  targetDate: z.string(),
  investmentId: z.string(),
})
export type InvestmentGoalsPostInvestmentGoalBody = z.infer<
  typeof InvestmentGoalsPostInvestmentGoalBodySchema
>
export const InvestmentGoalsPutInvestmentGoalByIdBodySchema = z.object({
  name: z.string().optional(),
  targetAmount: z.number().optional(),
  currentAmount: z.number().optional(),
  targetDate: z.string().optional(),
  investmentId: z.string().optional(),
})
export type InvestmentGoalsPutInvestmentGoalByIdBody = z.infer<
  typeof InvestmentGoalsPutInvestmentGoalByIdBodySchema
>
