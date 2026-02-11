// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:20.590Z
import { z } from 'zod'
import type { CategoriesCreateBodySchema, CategoriesCreateResponseSchema, CategoriesGetResponseSchema, CategoriesGetByIdResponseSchema, CategoriesUpdateByIdBodySchema, CategoriesUpdateByIdResponseSchema, CategoriesDeleteCateoriesByIdResponseSchema } from '@/lib/openapi/zod/Categories'

export type CategoriesCreateResponse = z.infer<typeof CategoriesCreateResponseSchema>
export type CategoriesGetResponse = z.infer<typeof CategoriesGetResponseSchema>
export type CategoriesGetByIdResponse = z.infer<typeof CategoriesGetByIdResponseSchema>
export type CategoriesUpdateByIdResponse = z.infer<typeof CategoriesUpdateByIdResponseSchema>
export type CategoriesDeleteCateoriesByIdResponse = z.infer<typeof CategoriesDeleteCateoriesByIdResponseSchema>
export type CategoriesCreateBody = z.infer<typeof CategoriesCreateBodySchema>
export type CategoriesUpdateByIdBody = z.infer<typeof CategoriesUpdateByIdBodySchema>