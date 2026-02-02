// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.179Z
import { z } from 'zod'

export const HealthGetHealthResponseSchema = z.object({ "status": z.string(), "uptime": z.number().optional(), "timestamp": z.number().optional(), "database": z.string().optional() })
export type HealthGetHealthResponse = z.infer<typeof HealthGetHealthResponseSchema>