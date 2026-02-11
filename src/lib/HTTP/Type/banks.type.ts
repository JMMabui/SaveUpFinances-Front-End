// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:20.432Z
import { z } from 'zod'
import type { BanksCreateBodySchema, BanksCreateResponseSchema, BanksGetResponseSchema, BanksGetByIdResponseSchema, BanksUpdateByIdBodySchema, BanksUpdateByIdResponseSchema, BanksDeleteByIdResponseSchema } from '@/lib/openapi/zod/Banks'

export type BanksCreateResponse = z.infer<typeof BanksCreateResponseSchema>
export type BanksGetResponse = z.infer<typeof BanksGetResponseSchema>
export type BanksGetByIdResponse = z.infer<typeof BanksGetByIdResponseSchema>
export type BanksUpdateByIdResponse = z.infer<typeof BanksUpdateByIdResponseSchema>
export type BanksDeleteByIdResponse = z.infer<typeof BanksDeleteByIdResponseSchema>
export type BanksCreateBody = z.infer<typeof BanksCreateBodySchema>
export type BanksUpdateByIdBody = z.infer<typeof BanksUpdateByIdBodySchema>
export type bankResponse = BanksGetResponse['data'][number]
