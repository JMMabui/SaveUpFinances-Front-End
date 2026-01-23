import { z } from 'zod'
export const IncomeSourcePostIncomeSourceBodySchema = z.object({
  name: z.string(),
  frequency: z.string(),
  startDate: z.string(),
  endDate: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
  userId: z.string(),
})
export const IncomeSourcePostIncomeSourceResponseSchema = z.unknown()
export const IncomeSourceGetIncomeSourceBodySchema = z.unknown()
export const IncomeSourceGetIncomeSourceResponseSchema = z.unknown()
export const IncomeSourceGetIncomeSourceByIdBodySchema = z.unknown()
export const IncomeSourceGetIncomeSourceByIdResponseSchema = z.unknown()
export const IncomeSourcePutIncomeSourceByIdBodySchema = z.object({
  name: z.string().optional(),
  frequency: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.union([z.string(), z.null()]).optional(),
  isActive: z.boolean().optional(),
  userId: z.string().optional(),
})
export const IncomeSourcePutIncomeSourceByIdResponseSchema = z.unknown()
export const IncomeSourceDeleteIncomeSourceByIdBodySchema = z.unknown()
export const IncomeSourceDeleteIncomeSourceByIdResponseSchema = z.unknown()
