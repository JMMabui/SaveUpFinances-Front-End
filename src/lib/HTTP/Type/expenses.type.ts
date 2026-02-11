// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.458Z
import { z } from 'zod'
import type { ExpensesCreateBodySchema, ExpensesCreateResponseSchema, ExpensesGetResponseSchema, ExpensesGetByIdResponseSchema, ExpensesUpdateByIdBodySchema, ExpensesUpdateByIdResponseSchema, ExpensesDeleteByIdResponseSchema, ExpensesGetByUserResponseSchema, ExpensesGetByCategoryResponseSchema } from '@/lib/openapi/zod/Expenses'

export type ExpensesCreateResponse = z.infer<typeof ExpensesCreateResponseSchema>
export type ExpensesGetResponse = z.infer<typeof ExpensesGetResponseSchema>
export type ExpensesGetByIdResponse = z.infer<typeof ExpensesGetByIdResponseSchema>
export type ExpensesUpdateByIdResponse = z.infer<typeof ExpensesUpdateByIdResponseSchema>
export type ExpensesDeleteByIdResponse = z.infer<typeof ExpensesDeleteByIdResponseSchema>
export type ExpensesGetByUserResponse = z.infer<typeof ExpensesGetByUserResponseSchema>
export type ExpensesGetByCategoryResponse = z.infer<typeof ExpensesGetByCategoryResponseSchema>
export type ExpensesCreateBody = z.infer<typeof ExpensesCreateBodySchema>
export type ExpensesUpdateByIdBody = z.infer<typeof ExpensesUpdateByIdBodySchema>