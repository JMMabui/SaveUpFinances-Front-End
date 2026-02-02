// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.062Z
import { z } from 'zod'

export const AccountsSourcePostAccountSourceBodySchema = z.object({ "accountId": z.string(), "source": z.string() })
export type AccountsSourcePostAccountSourceBody = z.infer<typeof AccountsSourcePostAccountSourceBodySchema>
export const AccountsSourcePutAccountSourceByIdBodySchema = z.object({ "accountId": z.string().optional(), "source": z.string().optional() })
export type AccountsSourcePutAccountSourceByIdBody = z.infer<typeof AccountsSourcePutAccountSourceByIdBodySchema>