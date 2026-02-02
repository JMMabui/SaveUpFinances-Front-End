// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.116Z
import { z } from 'zod'

export const ExpensesPostExpensesBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  month: z.number(),
  year: z.number(),
  categoryId: z.string(),
  accountId: z.string(),
  userId: z.string(),
})
export type ExpensesPostExpensesBody = z.infer<
  typeof ExpensesPostExpensesBodySchema
>
export const ExpensesPutExpensesByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  userId: z.string().optional(),
})
export type ExpensesPutExpensesByIdBody = z.infer<
  typeof ExpensesPutExpensesByIdBodySchema
>

export interface ExpensesResponse {
  id: string
  description: string
  amount: number
  date: string
  month: number
  year: number
  categoryId: string
  accountId: string
  userId: string
  createdAt: string
  updatedAt: string
}
