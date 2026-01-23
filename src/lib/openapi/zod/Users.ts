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
