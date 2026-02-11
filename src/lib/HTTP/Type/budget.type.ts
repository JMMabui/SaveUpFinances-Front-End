// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:20.812Z
import { z } from 'zod'
import type { BudgetCreateBodySchema, BudgetCreateResponseSchema, BudgetGetResponseSchema, BudgetGetByIdResponseSchema, BudgetUpdateByIdBodySchema, BudgetUpdateByIdResponseSchema, BudgetDeleteByIdResponseSchema, BudgetGetByUserResponseSchema } from '@/lib/openapi/zod/Budget'

export type BudgetCreateResponse = z.infer<typeof BudgetCreateResponseSchema>
export type BudgetGetResponse = z.infer<typeof BudgetGetResponseSchema>
export type BudgetGetByIdResponse = z.infer<typeof BudgetGetByIdResponseSchema>
export type BudgetUpdateByIdResponse = z.infer<typeof BudgetUpdateByIdResponseSchema>
export type BudgetDeleteByIdResponse = z.infer<typeof BudgetDeleteByIdResponseSchema>
export type BudgetGetByUserResponse = z.infer<typeof BudgetGetByUserResponseSchema>
export type BudgetCreateBody = z.infer<typeof BudgetCreateBodySchema>
export type BudgetUpdateByIdBody = z.infer<typeof BudgetUpdateByIdBodySchema>
export type budgetResponse = BudgetGetResponse['data'][number]
