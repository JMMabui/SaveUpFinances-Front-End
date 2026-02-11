import type { z } from 'zod'
import type { DebtPaymentsCreateBodySchema } from '@/lib/openapi/zod/DebtPayments'

export interface debtPaymentsResponse {
  id: string
  createdAt: Date
  date: Date
  amount: number
  accountId: string | null
  notes: string | null
  debtId: string
}

export type debtPaymentsRequest = z.infer<
  typeof DebtPaymentsCreateBodySchema
>
