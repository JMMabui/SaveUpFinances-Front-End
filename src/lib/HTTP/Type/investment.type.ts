import type { z } from 'zod'
import type { InvestmentsPostInvestmentBodySchema } from '@/lib/openapi/zod/Investments'

export interface investmentResponse {
  id: string
  userId: string
  createdAt: Date
  investimentName: string
  amount: number
  investmentTypeId: string
  investmentGoalId: string | null
  notes: string | null
  updatedAt: Date
}

export type investmentRequest = z.infer<
  typeof InvestmentsPostInvestmentBodySchema
>
