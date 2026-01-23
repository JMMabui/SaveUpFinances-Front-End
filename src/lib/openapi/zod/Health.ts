import { z } from 'zod'
export const HealthGetHealthBodySchema = z.unknown()
export const HealthGetHealthResponseSchema = z.object({
  status: z.string(),
  uptime: z.number().optional(),
  timestamp: z.number().optional(),
  database: z.string().optional(),
})
