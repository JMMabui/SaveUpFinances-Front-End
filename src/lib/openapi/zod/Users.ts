import { z } from 'zod'
export const UsersPostUsersBodySchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  password: z.string(),
  contact: z.string(),
})
export const UsersPostUsersResponseSchema = z.unknown()
export const UsersGetUsersBodySchema = z.unknown()
export const UsersGetUsersResponseSchema = z.unknown()
export const UsersGetUsersByIdBodySchema = z.unknown()
export const UsersGetUsersByIdResponseSchema = z.unknown()
export const UsersPutUsersByIdBodySchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  contact: z.string().optional(),
  updateAt: z.string().optional(),
})
export const UsersPutUsersByIdResponseSchema = z.unknown()
export const UsersDeleteUsersByIdBodySchema = z.unknown()
export const UsersDeleteUsersByIdResponseSchema = z.unknown()
export const UsersGetUsersByIdProfileBodySchema = z.unknown()
export const UsersGetUsersByIdProfileResponseSchema = z.unknown()
export const UsersPutUsersByIdProfileBodySchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  contact: z.string().optional(),
})
export const UsersPutUsersByIdProfileResponseSchema = z.unknown()
export const UsersPostUsersByIdChangePasswordBodySchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
})
export const UsersPostUsersByIdChangePasswordResponseSchema = z.unknown()
export const UsersGetUsersByIdSettingsBodySchema = z.unknown()
export const UsersGetUsersByIdSettingsResponseSchema = z.unknown()
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
export const UsersPutUsersByIdSettingsResponseSchema = z.unknown()
