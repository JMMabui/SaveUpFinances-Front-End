// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.065Z
import { z } from 'zod'

export const BanksPostBanksBodySchema = z.object({ "bankName": z.string(), "logoUrl": z.union([z.string(), z.null()]).optional() })
export type BanksPostBanksBody = z.infer<typeof BanksPostBanksBodySchema>
export const BanksPutBanksByIdBodySchema = z.object({ "bankName": z.string().optional(), "logoUrl": z.union([z.string(), z.null()]).optional() })
export type BanksPutBanksByIdBody = z.infer<typeof BanksPutBanksByIdBodySchema>