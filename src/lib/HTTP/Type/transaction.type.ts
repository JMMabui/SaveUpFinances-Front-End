// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:09.465Z
import { z } from 'zod'

export const TransactionPostTransactionBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  type: z.enum([
    'income',
    'expense',
    'transfer',
    'investment',
    'creditCardExpense',
    'debtPayment',
    'debtIncome',
    'budgetExpense',
    'budgetIncome',
    'creditCardPayment',
    'creditCardTransfer',
    'creditCardIncome',
  ]),
  date: z.string(),
  month: z.number(),
  year: z.number(),
  userId: z.string(),
  accountId: z.string(),
  debitAccountId: z.union([z.string(), z.null()]).optional(),
  categoryId: z.string(),
  incomeSourceId: z.union([z.string(), z.null()]).optional(),
  incomeId: z.union([z.string(), z.null()]).optional(),
})
export type TransactionPostTransactionBody = z.infer<
  typeof TransactionPostTransactionBodySchema
>
export const TransactionPutTransactionByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  type: z
    .enum([
      'income',
      'expense',
      'transfer',
      'investment',
      'creditCardExpense',
      'debtPayment',
      'debtIncome',
      'budgetExpense',
      'budgetIncome',
      'creditCardPayment',
      'creditCardTransfer',
      'creditCardIncome',
    ])
    .optional(),
  date: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  userId: z.string().optional(),
  accountId: z.string().optional(),
  debitAccountId: z.union([z.string(), z.null()]).optional(),
  categoryId: z.string().optional(),
  incomeSourceId: z.union([z.string(), z.null()]).optional(),
  incomeId: z.union([z.string(), z.null()]).optional(),
})
export type TransactionPutTransactionByIdBody = z.infer<
  typeof TransactionPutTransactionByIdBodySchema
>
