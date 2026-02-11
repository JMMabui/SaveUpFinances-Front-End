// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:19.878Z
import { z } from 'zod'
import type { AccountsCreateBodySchema, AccountsCreateResponseSchema, AccountsGetResponseSchema, AccountsGetByIdResponseSchema, AccountsUpdateByIdBodySchema, AccountsUpdateByIdResponseSchema, AccountsDeleteByIdResponseSchema, AccountsGetByIdTransactionsResponseSchema, AccountsGetDefaultByUserResponseSchema, AccountsGetAccountByUserResponseSchema } from '@/lib/openapi/zod/Accounts'

export type AccountsCreateResponse = z.infer<typeof AccountsCreateResponseSchema>
export type AccountsGetResponse = z.infer<typeof AccountsGetResponseSchema>
export type AccountsGetByIdResponse = z.infer<typeof AccountsGetByIdResponseSchema>
export type AccountsUpdateByIdResponse = z.infer<typeof AccountsUpdateByIdResponseSchema>
export type AccountsDeleteByIdResponse = z.infer<typeof AccountsDeleteByIdResponseSchema>
export type AccountsGetByIdTransactionsResponse = z.infer<typeof AccountsGetByIdTransactionsResponseSchema>
export type AccountsGetDefaultByUserResponse = z.infer<typeof AccountsGetDefaultByUserResponseSchema>
export type AccountsGetAccountByUserResponse = z.infer<typeof AccountsGetAccountByUserResponseSchema>
export type AccountsCreateBody = z.infer<typeof AccountsCreateBodySchema>
export type AccountsUpdateByIdBody = z.infer<typeof AccountsUpdateByIdBodySchema>