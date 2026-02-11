// Auto-generated from Swagger API
// Generated on: 2026-02-05T09:14:19.515Z
import { z } from 'zod'
import type { AuthGetCsrfTokenResponseSchema, AuthCreateLoginBodySchema, AuthCreateLoginResponseSchema, AuthCreateRefreshTokenResponseSchema, AuthCreateLogoutResponseSchema, AuthCreateForgotPasswordBodySchema, AuthCreateForgotPasswordResponseSchema, AuthCreateResetPasswordBodySchema, AuthCreateResetPasswordResponseSchema, AuthCreateVerifyResetTokenBodySchema, AuthCreateVerifyResetTokenResponseSchema, AuthGetResetPasswordByTokenResponseSchema } from '@/lib/openapi/zod/Auth'

export type AuthGetCsrfTokenResponse = z.infer<typeof AuthGetCsrfTokenResponseSchema>
export type AuthCreateLoginResponse = z.infer<typeof AuthCreateLoginResponseSchema>
export type AuthCreateRefreshTokenResponse = z.infer<typeof AuthCreateRefreshTokenResponseSchema>
export type AuthCreateLogoutResponse = z.infer<typeof AuthCreateLogoutResponseSchema>
export type AuthCreateForgotPasswordResponse = z.infer<typeof AuthCreateForgotPasswordResponseSchema>
export type AuthCreateResetPasswordResponse = z.infer<typeof AuthCreateResetPasswordResponseSchema>
export type AuthCreateVerifyResetTokenResponse = z.infer<typeof AuthCreateVerifyResetTokenResponseSchema>
export type AuthGetResetPasswordByTokenResponse = z.infer<typeof AuthGetResetPasswordByTokenResponseSchema>
export type AuthCreateLoginBody = z.infer<typeof AuthCreateLoginBodySchema>
export type AuthCreateForgotPasswordBody = z.infer<typeof AuthCreateForgotPasswordBodySchema>
export type AuthCreateResetPasswordBody = z.infer<typeof AuthCreateResetPasswordBodySchema>
export type AuthCreateVerifyResetTokenBody = z.infer<typeof AuthCreateVerifyResetTokenBodySchema>