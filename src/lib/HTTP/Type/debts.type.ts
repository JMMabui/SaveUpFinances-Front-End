// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.309Z
import { z } from 'zod'

export const DebtsPostDebtsBodySchema = z.object({
  description: z.string(),
  amount: z.number(),
  creditor: z.string(),
  dueDate: z.string(),
  status: z.enum(['PENDING', 'PAID']),
  notes: z.union([z.string(), z.null()]).optional(),
  paymentDate: z.union([z.string(), z.null()]).optional(),
  userId: z.string(),
})
export type DebtsPostDebtsBody = z.infer<typeof DebtsPostDebtsBodySchema>
export const DebtsPutDebtsByIdBodySchema = z.object({
  description: z.string().optional(),
  amount: z.number().optional(),
  creditor: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['PENDING', 'PAID']).optional(),
  notes: z.union([z.string(), z.null()]).optional(),
  paymentDate: z.union([z.string(), z.null()]).optional(),
  userId: z.string().optional(),
})
export type DebtsPutDebtsByIdBody = z.infer<typeof DebtsPutDebtsByIdBodySchema>

export interface debtsResponse {
  id: string
  description: string
  amount: number
  creditor: string
  dueDate: string
  status: 'PENDING' | 'PAID'
  notes: string | null
  paymentDate: string | null
  userId: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type debtsRequest = z.infer<typeof DebtsPostDebtsBodySchema>
