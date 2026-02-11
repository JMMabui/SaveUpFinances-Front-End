// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.548Z
import { z } from 'zod'
import type { IncomesCreateIncomeBodySchema, IncomesCreateIncomeResponseSchema, IncomesGetIncomeResponseSchema, IncomesGetIncomeByIdResponseSchema, IncomesUpdateIncomeByIdBodySchema, IncomesUpdateIncomeByIdResponseSchema, IncomesDeleteIncomeByIdResponseSchema, IncomesGetIncomeByUserResponseSchema, IncomesGetIncomeSourceByIdResponseSchema } from '@/lib/openapi/zod/Incomes'

export type IncomesCreateIncomeResponse = z.infer<typeof IncomesCreateIncomeResponseSchema>
export type IncomesGetIncomeResponse = z.infer<typeof IncomesGetIncomeResponseSchema>
export type IncomesGetIncomeByIdResponse = z.infer<typeof IncomesGetIncomeByIdResponseSchema>
export type IncomesUpdateIncomeByIdResponse = z.infer<typeof IncomesUpdateIncomeByIdResponseSchema>
export type IncomesDeleteIncomeByIdResponse = z.infer<typeof IncomesDeleteIncomeByIdResponseSchema>
export type IncomesGetIncomeByUserResponse = z.infer<typeof IncomesGetIncomeByUserResponseSchema>
export type IncomesGetIncomeSourceByIdResponse = z.infer<typeof IncomesGetIncomeSourceByIdResponseSchema>
export type IncomesCreateIncomeBody = z.infer<typeof IncomesCreateIncomeBodySchema>
export type IncomesUpdateIncomeByIdBody = z.infer<typeof IncomesUpdateIncomeByIdBodySchema>