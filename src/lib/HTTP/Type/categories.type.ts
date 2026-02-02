// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.074Z
import { z } from 'zod'

export const CategoriesPostCategoriesBodySchema = z.object({ "categoryName": z.string(), "categoryType": z.enum(["income", "expense", "transfer", "investment", "creditCardExpense", "debtPayment", "debtIncome", "budgetExpense", "budgetIncome", "creditCardPayment", "creditCardTransfer", "creditCardIncome"]), "icon": z.union([z.string(), z.null()]).optional(), "color": z.union([z.string(), z.null()]).optional() })
export type CategoriesPostCategoriesBody = z.infer<typeof CategoriesPostCategoriesBodySchema>
export const CategoriesPutCategoriesByIdBodySchema = z.object({ "categoryName": z.string().optional(), "categoryType": z.enum(["income", "expense", "transfer", "investment", "creditCardExpense", "debtPayment", "debtIncome", "budgetExpense", "budgetIncome", "creditCardPayment", "creditCardTransfer", "creditCardIncome"]).optional(), "icon": z.union([z.string(), z.null()]).optional(), "color": z.union([z.string(), z.null()]).optional() })
export type CategoriesPutCategoriesByIdBody = z.infer<typeof CategoriesPutCategoriesByIdBodySchema>