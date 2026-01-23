import type { z } from 'zod'
import type { ExpensesPostExpensesBodySchema } from '@/lib/openapi/zod/Expenses'

export interface expensesResponse {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  date: string
  description: string
  amount: number
  categoryId: string
}

export type expensesRequest = z.infer<typeof ExpensesPostExpensesBodySchema>
