// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:08.219Z
import { z } from 'zod'

export const CreditCardsPostCreditCardsBodySchema = z.object({
  name: z.string(),
  limit: z.number(),
  dueDay: z.number(),
  userId: z.string(),
})
export type CreditCardsPostCreditCardsBody = z.infer<
  typeof CreditCardsPostCreditCardsBodySchema
>
export const CreditCardsPutCreditCardsByIdBodySchema = z.object({
  name: z.string().optional(),
  limit: z.number().optional(),
  dueDay: z.number().optional(),
  userId: z.string().optional(),
})
export type CreditCardsPutCreditCardsByIdBody = z.infer<
  typeof CreditCardsPutCreditCardsByIdBodySchema
>
