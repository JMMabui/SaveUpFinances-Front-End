import type { z } from 'zod'
import type { BanksPostBanksBodySchema } from '@/lib/openapi/zod/Banks'

export interface bankResponde {
  id: string
  bankName: string
  logoUrl: string | null
}

export type bankRequest = z.infer<typeof BanksPostBanksBodySchema>
