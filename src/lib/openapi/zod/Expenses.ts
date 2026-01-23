import { z } from 'zod'
export const ExpensesPostExpensesBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  categoryId: z.string(),
  userId: z.string(),
})
export const ExpensesPostExpensesResponseSchema = z.unknown()
export const ExpensesGetExpensesBodySchema = z.unknown()
export const ExpensesGetExpensesResponseSchema = z.unknown()
export const ExpensesGetExpensesByIdBodySchema = z.unknown()
export const ExpensesGetExpensesByIdResponseSchema = z.unknown()
export const ExpensesPutExpensesByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  categoryId: z.string().optional(),
  userId: z.string().optional(),
})
export const ExpensesPutExpensesByIdResponseSchema = z.unknown()
export const ExpensesDeleteExpensesByIdBodySchema = z.unknown()
export const ExpensesDeleteExpensesByIdResponseSchema = z.unknown()
export const ExpensesGetExpensesUserByUserIdBodySchema = z.unknown()
export const ExpensesGetExpensesUserByUserIdResponseSchema = z.unknown()
export const ExpensesGetExpensesCategoryByCategoryIdBodySchema = z.unknown()
export const ExpensesGetExpensesCategoryByCategoryIdResponseSchema = z.unknown()
