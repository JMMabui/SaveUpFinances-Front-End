// Auto-generated from Swagger API
// Generated on: 2026-01-23T14:39:07.697Z
import { z } from 'zod'

export const UsersPostUsersBodySchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string(),
  contact: z.string(),
})
export type UsersPostUsersBody = z.infer<typeof UsersPostUsersBodySchema>
export const UsersPutUsersByIdBodySchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  contact: z.string().optional(),
  updateAt: z.string().optional(),
})
export type UsersPutUsersByIdBody = z.infer<typeof UsersPutUsersByIdBodySchema>
export const UsersPutUsersByIdProfileBodySchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  contact: z.string().optional(),
})
export type UsersPutUsersByIdProfileBody = z.infer<
  typeof UsersPutUsersByIdProfileBodySchema
>
export const UsersPostUsersByIdChangePasswordBodySchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})
export type UsersPostUsersByIdChangePasswordBody = z.infer<
  typeof UsersPostUsersByIdChangePasswordBodySchema
>
export const UsersPutUsersByIdSettingsBodySchema = z.object({
  language: z.enum(['pt-BR', 'en-US', 'es-ES']).optional(),
  currency: z
    .enum([
      'MZN',
      'USD',
      'EUR',
      'GBP',
      'BRL',
      'JPY',
      'CNY',
      'INR',
      'RUB',
      'AUD',
      'CAD',
    ])
    .optional(),
  theme: z.enum(['light', 'dark', 'auto']).optional(),
  timezone: z.string().optional(),
  dateFormat: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
})
export type UsersPutUsersByIdSettingsBody = z.infer<
  typeof UsersPutUsersByIdSettingsBodySchema
>
