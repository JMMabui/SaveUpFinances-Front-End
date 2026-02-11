// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.734Z
import { z } from 'zod'
import type { InvestmentsCreateInvestmentBodySchema, InvestmentsCreateInvestmentResponseSchema, InvestmentsGetInvestmentResponseSchema, InvestmentsGetInvestmentByUserResponseSchema, InvestmentsUpdateInvestmentByIdBodySchema, InvestmentsUpdateInvestmentByIdResponseSchema, InvestmentsDeleteInvestmentByIdResponseSchema } from '@/lib/openapi/zod/Investments'

export type InvestmentsCreateInvestmentResponse = z.infer<typeof InvestmentsCreateInvestmentResponseSchema>
export type InvestmentsGetInvestmentResponse = z.infer<typeof InvestmentsGetInvestmentResponseSchema>
export type InvestmentsGetInvestmentByUserResponse = z.infer<typeof InvestmentsGetInvestmentByUserResponseSchema>
export type InvestmentsUpdateInvestmentByIdResponse = z.infer<typeof InvestmentsUpdateInvestmentByIdResponseSchema>
export type InvestmentsDeleteInvestmentByIdResponse = z.infer<typeof InvestmentsDeleteInvestmentByIdResponseSchema>
export type InvestmentsCreateInvestmentBody = z.infer<typeof InvestmentsCreateInvestmentBodySchema>
export type InvestmentsUpdateInvestmentByIdBody = z.infer<typeof InvestmentsUpdateInvestmentByIdBodySchema>