// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.825Z
import { z } from 'zod'

export const IncomeSourcePostIncomeSourceBodySchema = z.object({
  name: z.string(),
  frequency: z.string(),
  startDate: z.string(),
  endDate: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
})
export type IncomeSourcePostIncomeSourceBody = z.infer<
  typeof IncomeSourcePostIncomeSourceBodySchema
>
export const IncomeSourcePutIncomeSourceByIdBodySchema = z.object({
  name: z.string().optional(),
  frequency: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
  userId: z.string().optional(),
})
export type IncomeSourcePutIncomeSourceByIdBody = z.infer<
  typeof IncomeSourcePutIncomeSourceByIdBodySchema
>
