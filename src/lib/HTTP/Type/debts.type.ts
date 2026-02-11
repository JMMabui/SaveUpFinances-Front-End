// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:21.153Z
import { z } from 'zod'
import type { DebtsCreateBodySchema, DebtsCreateResponseSchema, DebtsGetResponseSchema, DebtsGetByIdResponseSchema, DebtsUpdateByIdBodySchema, DebtsUpdateByIdResponseSchema, DebtsDeleteByIdResponseSchema, DebtsGetByUserResponseSchema } from '@/lib/openapi/zod/Debts'

export type DebtsCreateResponse = z.infer<typeof DebtsCreateResponseSchema>
export type DebtsGetResponse = z.infer<typeof DebtsGetResponseSchema>
export type DebtsGetByIdResponse = z.infer<typeof DebtsGetByIdResponseSchema>
export type DebtsUpdateByIdResponse = z.infer<typeof DebtsUpdateByIdResponseSchema>
export type DebtsDeleteByIdResponse = z.infer<typeof DebtsDeleteByIdResponseSchema>
export type DebtsGetByUserResponse = z.infer<typeof DebtsGetByUserResponseSchema>
export type DebtsCreateBody = z.infer<typeof DebtsCreateBodySchema>
export type DebtsUpdateByIdBody = z.infer<typeof DebtsUpdateByIdBodySchema>
export type debtsResponse = DebtsGetResponse['data']['items'][number]
export type debtsRequest = DebtsCreateBody
