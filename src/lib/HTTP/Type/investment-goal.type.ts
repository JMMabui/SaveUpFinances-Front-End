import type { z } from 'zod'
import type { InvestmentGoalsPostInvestmentGoalBodySchema } from '@/lib/openapi/zod/InvestmentGoals'

export interface investmentResponse {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  targetAmount: number
  currentAmount: number
  targetDate: Date
}

export type investmentRequest = z.infer<
  typeof InvestmentGoalsPostInvestmentGoalBodySchema
>
