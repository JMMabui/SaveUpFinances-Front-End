import { z } from 'zod'
export const AuthGetAuthCsrfTokenBodySchema = z.unknown()
export const AuthGetAuthCsrfTokenResponseSchema = z.unknown()
export const AuthPostAuthLoginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})
export const AuthPostAuthLoginResponseSchema = z.unknown()
export const AuthPostAuthRefreshTokenBodySchema = z.unknown()
export const AuthPostAuthRefreshTokenResponseSchema = z.unknown()
export const AuthPostAuthLogoutBodySchema = z.unknown()
export const AuthPostAuthLogoutResponseSchema = z.unknown()
export const AuthPostAuthForgotPasswordBodySchema = z.object({
  email: z.string(),
})
export const AuthPostAuthForgotPasswordResponseSchema = z.unknown()
export const AuthPostAuthResetPasswordBodySchema = z.object({
  token: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})
export const AuthPostAuthResetPasswordResponseSchema = z.unknown()
export const AuthPostAuthVerifyResetTokenBodySchema = z.object({
  token: z.string(),
})
export const AuthPostAuthVerifyResetTokenResponseSchema = z.unknown()
export const AuthGetAuthResetPasswordByTokenBodySchema = z.unknown()
export const AuthGetAuthResetPasswordByTokenResponseSchema = z.unknown()
