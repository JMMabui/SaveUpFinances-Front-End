import { z } from 'zod'
export const CreditCardsPostCreditCardsBodySchema = z.object({
  name: z.string(),
  limit: z.number(),
  dueDay: z.number(),
  userId: z.string(),
})
export const CreditCardsPostCreditCardsResponseSchema = z.unknown()
export const CreditCardsGetCreditCardsBodySchema = z.unknown()
export const CreditCardsGetCreditCardsResponseSchema = z.unknown()
export const CreditCardsGetCreditCardsByIdBodySchema = z.unknown()
export const CreditCardsGetCreditCardsByIdResponseSchema = z.unknown()
export const CreditCardsPutCreditCardsByIdBodySchema = z.object({
  name: z.string().optional(),
  limit: z.number().optional(),
  dueDay: z.number().optional(),
  userId: z.string().optional(),
})
export const CreditCardsPutCreditCardsByIdResponseSchema = z.unknown()
export const CreditCardsDeleteCreditCardsByIdBodySchema = z.unknown()
export const CreditCardsDeleteCreditCardsByIdResponseSchema = z.unknown()
export const CreditCardsGetCreditCardsUserByUserIdBodySchema = z.unknown()
export const CreditCardsGetCreditCardsUserByUserIdResponseSchema = z.unknown()
