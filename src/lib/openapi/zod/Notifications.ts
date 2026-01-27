import { z } from 'zod'
export const NotificationsGetNotificationsBodySchema = z.unknown()
export const NotificationsGetNotificationsResponseSchema = z.unknown()
export const NotificationsDeleteNotificationsBodySchema = z.unknown()
export const NotificationsDeleteNotificationsResponseSchema = z.unknown()
export const NotificationsGetNotificationsUnreadCountBodySchema = z.unknown()
export const NotificationsGetNotificationsUnreadCountResponseSchema =
  z.unknown()
export const NotificationsGetNotificationsByIdBodySchema = z.unknown()
export const NotificationsGetNotificationsByIdResponseSchema = z.unknown()
export const NotificationsDeleteNotificationsByIdBodySchema = z.unknown()
export const NotificationsDeleteNotificationsByIdResponseSchema = z.unknown()
export const NotificationsPutNotificationsByIdReadBodySchema = z.object({
  isRead: z.boolean(),
})
export const NotificationsPutNotificationsByIdReadResponseSchema = z.unknown()
export const NotificationsPutNotificationsReadAllBodySchema = z.unknown()
export const NotificationsPutNotificationsReadAllResponseSchema = z.unknown()
export const NotificationsGetNotificationsPreferencesBodySchema = z.unknown()
export const NotificationsGetNotificationsPreferencesResponseSchema =
  z.unknown()
export const NotificationsPutNotificationsPreferencesBodySchema = z.object({
  emailNotifications: z.boolean().optional(),
  inAppNotifications: z.boolean().optional(),
  notifyExpenses: z.boolean().optional(),
  notifyIncomes: z.boolean().optional(),
  notifyDebts: z.boolean().optional(),
  notifyBudgetAlerts: z.boolean().optional(),
  notifyInvestmentAlerts: z.boolean().optional(),
  notifyAccountTransfers: z.boolean().optional(),
  dailyDigest: z.boolean().optional(),
  digestTime: z.string().optional(),
})
export const NotificationsPutNotificationsPreferencesResponseSchema =
  z.unknown()
