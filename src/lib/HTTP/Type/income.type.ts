import type { z } from 'zod'
import type { IncomesCreateIncomeBodySchema } from '@/lib/openapi/zod/Incomes'

export interface incomeResponse {
  id: string
  userId: string
  createdAt: string
  date: string
  description: string
  amount: number
  sourceId: string
}

export type incomeRequest = z.infer<typeof IncomesCreateIncomeBodySchema>
