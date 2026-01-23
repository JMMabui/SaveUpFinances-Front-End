import type { z } from 'zod'
import type { CategoriesPostCategoriesBodySchema } from '@/lib/openapi/zod/Categories'

export interface categoryResponse {
  id: string
  createdAt: Date
  updatedAt: Date
  categoryName: string
  categoryType: z.infer<
    typeof CategoriesPostCategoriesBodySchema
  >['categoryType']
  icon: string | null
  color: string | null
}

export type categoryRequest = z.infer<typeof CategoriesPostCategoriesBodySchema>
