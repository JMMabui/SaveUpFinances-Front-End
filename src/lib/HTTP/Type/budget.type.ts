export interface budgetResponse {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  month: number
  year: number
  categoryId: string
  limit: number
}

import type { z } from 'zod'
import type {
  BudgetPostBudgetBodySchema,
  BudgetPutBudgetByIdBodySchema,
} from '@/lib/openapi/zod/Budget'

export type budgetRequest = z.infer<typeof BudgetPostBudgetBodySchema>

export type budgetUpdateRequest = z.infer<typeof BudgetPutBudgetByIdBodySchema>
