// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:07.630Z
import { z } from 'zod'

export const AuthPostAuthLoginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})
export type AuthPostAuthLoginBody = z.infer<typeof AuthPostAuthLoginBodySchema>
export const AuthPostAuthForgotPasswordBodySchema = z.object({
  email: z.string(),
})
export type AuthPostAuthForgotPasswordBody = z.infer<
  typeof AuthPostAuthForgotPasswordBodySchema
>
export const AuthPostAuthResetPasswordBodySchema = z.object({
  token: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})
export type AuthPostAuthResetPasswordBody = z.infer<
  typeof AuthPostAuthResetPasswordBodySchema
>
export const AuthPostAuthVerifyResetTokenBodySchema = z.object({
  token: z.string(),
})
export type AuthPostAuthVerifyResetTokenBody = z.infer<
  typeof AuthPostAuthVerifyResetTokenBodySchema
>
