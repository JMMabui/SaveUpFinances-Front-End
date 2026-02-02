// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.080Z
import { z } from 'zod'

export const CreditCardsPostCreditCardsBodySchema = z.object({ "name": z.string(), "limit": z.number(), "dueDay": z.number(), "userId": z.string() })
export type CreditCardsPostCreditCardsBody = z.infer<typeof CreditCardsPostCreditCardsBodySchema>
export const CreditCardsPutCreditCardsByIdBodySchema = z.object({ "name": z.string().optional(), "limit": z.number().optional(), "dueDay": z.number().optional(), "userId": z.string().optional() })
export type CreditCardsPutCreditCardsByIdBody = z.infer<typeof CreditCardsPutCreditCardsByIdBodySchema>