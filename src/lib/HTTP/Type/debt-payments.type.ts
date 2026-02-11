// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.371Z
import { z } from 'zod'
import type { DebtPaymentsCreateBodySchema, DebtPaymentsCreateResponseSchema, DebtPaymentsGetResponseSchema, DebtPaymentsGetByIdResponseSchema, DebtPaymentsUpdateByIdBodySchema, DebtPaymentsUpdateByIdResponseSchema, DebtPaymentsDeleteByIdResponseSchema, DebtPaymentsGetDebtByIdResponseSchema } from '@/lib/openapi/zod/DebtPayments'

export type DebtPaymentsCreateResponse = z.infer<typeof DebtPaymentsCreateResponseSchema>
export type DebtPaymentsGetResponse = z.infer<typeof DebtPaymentsGetResponseSchema>
export type DebtPaymentsGetByIdResponse = z.infer<typeof DebtPaymentsGetByIdResponseSchema>
export type DebtPaymentsUpdateByIdResponse = z.infer<typeof DebtPaymentsUpdateByIdResponseSchema>
export type DebtPaymentsDeleteByIdResponse = z.infer<typeof DebtPaymentsDeleteByIdResponseSchema>
export type DebtPaymentsGetDebtByIdResponse = z.infer<typeof DebtPaymentsGetDebtByIdResponseSchema>
export type DebtPaymentsCreateBody = z.infer<typeof DebtPaymentsCreateBodySchema>
export type DebtPaymentsUpdateByIdBody = z.infer<typeof DebtPaymentsUpdateByIdBodySchema>