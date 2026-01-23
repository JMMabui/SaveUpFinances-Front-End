import { z } from 'zod'
export const InvestmentGoalsPostInvestmentGoalBodySchema = z.object({
  name: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number().optional(),
  targetDate: z.string(),
})
export const InvestmentGoalsPostInvestmentGoalResponseSchema = z.unknown()
export const InvestmentGoalsGetInvestmentGoalBodySchema = z.unknown()
export const InvestmentGoalsGetInvestmentGoalResponseSchema = z.unknown()
export const InvestmentGoalsPutInvestmentGoalByIdBodySchema = z.object({
  name: z.string().optional(),
  targetAmount: z.number().optional(),
  currentAmount: z.number().optional(),
  targetDate: z.string().optional(),
})
export const InvestmentGoalsPutInvestmentGoalByIdResponseSchema = z.unknown()
export const InvestmentGoalsDeleteInvestmentGoalByIdBodySchema = z.unknown()
export const InvestmentGoalsDeleteInvestmentGoalByIdResponseSchema = z.unknown()
