import { z } from 'zod'
export const HealthGetBodySchema = z.unknown()
export const HealthGetResponseSchema = z.object({ "status": z.string(), "uptime": z.number().optional(), "timestamp": z.number().optional(), "database": z.string().optional() })