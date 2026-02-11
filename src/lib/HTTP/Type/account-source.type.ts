import type { z } from 'zod'
import type { AccountsSourceCreateAccountSourceBodySchema } from '@/lib/openapi/zod/AccountsSource'

export interface accountSourceResponse {
  id: string
  accountId: string
  source: string
  createdAt: string
  updatedAt: string
}

export type accountSourceRequest = z.infer<
  typeof AccountsSourceCreateAccountSourceBodySchema
>
