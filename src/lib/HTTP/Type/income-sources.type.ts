import type { z } from 'zod'
import type { IncomeSourceCreateBodySchema } from '@/lib/openapi/zod/IncomeSource'

export interface incomeSourceResponse {
  name: string
  frequency: string
  startDate: string
  endDate: string | null
  id: string
  isActive: boolean
  userId: string
  createdAt: string
}

export type incomeSourceRequest = z.infer<
  typeof IncomeSourceCreateBodySchema
>
