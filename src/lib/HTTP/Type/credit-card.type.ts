import type { z } from 'zod'
import type { CreditCardsPostCreditCardsBodySchema } from '@/lib/openapi/zod/CreditCards'

export interface creditCardResponse {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  name: string
  limit: number
  dueDay: number
}

export type creditCardRequest = z.infer<
  typeof CreditCardsPostCreditCardsBodySchema
>
