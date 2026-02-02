import { z } from 'zod'
export const CreditCardExpensesPostCreditCardExpensesBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  date: z.string(),
  categoryId: z.string(),
  creditCardId: z.string(),
})
export const CreditCardExpensesPostCreditCardExpensesResponseSchema =
  z.unknown()
export const CreditCardExpensesGetCreditCardExpensesBodySchema = z.unknown()
export const CreditCardExpensesGetCreditCardExpensesResponseSchema = z.unknown()
export const CreditCardExpensesGetCreditCardExpensesByIdBodySchema = z.unknown()
export const CreditCardExpensesGetCreditCardExpensesByIdResponseSchema =
  z.unknown()
export const CreditCardExpensesPutCreditCardExpensesByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  categoryId: z.string().optional(),
  creditCardId: z.string().optional(),
})
export const CreditCardExpensesPutCreditCardExpensesByIdResponseSchema =
  z.unknown()
export const CreditCardExpensesDeleteCreditCardExpensesByIdBodySchema =
  z.unknown()
export const CreditCardExpensesDeleteCreditCardExpensesByIdResponseSchema =
  z.unknown()
export const CreditCardExpensesGetCreditCardExpensesCreditCardByCreditCardIdBodySchema =
  z.unknown()
export const CreditCardExpensesGetCreditCardExpensesCreditCardByCreditCardIdResponseSchema =
  z.unknown()
export const CreditCardExpensesGetCreditCardExpensesCategoryByCategoryIdBodySchema =
  z.unknown()
export const CreditCardExpensesGetCreditCardExpensesCategoryByCategoryIdResponseSchema =
  z.unknown()
