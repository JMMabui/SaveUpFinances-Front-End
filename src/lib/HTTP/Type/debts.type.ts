import type { z } from 'zod'
import type { DebtsPostDebtsBodySchema } from '@/lib/openapi/zod/Debts'

enum DebtStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export interface debtsResponse {
  id: string
  userId: string
  createdAt: Date
  description: string
  amount: number
  notes: string | null
  status: DebtStatus
  creditor: string
  dueDate: Date
  paymentDate: Date | null
}

export type debtsRequest = z.infer<typeof DebtsPostDebtsBodySchema>
