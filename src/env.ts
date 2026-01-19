import { z } from 'zod/v4'

const envSchema = z.object({
  VITE_API_URL: z.url(),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  VITE_ENABLE_ANALYTICS: z.string().default('false'),
  VITE_DEBUG_MODE: z.string().default('false'),
  VITE_ENABLE_PERFORMANCE_MONITORING: z.string().default('false'),
})

export const env = envSchema.parse(import.meta.env)
