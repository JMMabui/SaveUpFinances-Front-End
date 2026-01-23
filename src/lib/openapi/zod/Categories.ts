import { z } from 'zod'
export const CategoriesPostCategoriesBodySchema = z.object({
  categoryName: z.string(),
  categoryType: z.enum([
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
  icon: z.union([z.string(), z.null()]).optional(),
  color: z.union([z.string(), z.null()]).optional(),
})
export const CategoriesPostCategoriesResponseSchema = z.unknown()
export const CategoriesGetCategoriesBodySchema = z.unknown()
export const CategoriesGetCategoriesResponseSchema = z.unknown()
export const CategoriesGetCategoriesByIdBodySchema = z.unknown()
export const CategoriesGetCategoriesByIdResponseSchema = z.unknown()
export const CategoriesPutCategoriesByIdBodySchema = z.object({
  categoryName: z.string().optional(),
  categoryType: z
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
  icon: z.union([z.string(), z.null()]).optional(),
  color: z.union([z.string(), z.null()]).optional(),
})
export const CategoriesPutCategoriesByIdResponseSchema = z.unknown()
export const CategoriesDeleteCateoriesByIdBodySchema = z.unknown()
export const CategoriesDeleteCateoriesByIdResponseSchema = z.unknown()
