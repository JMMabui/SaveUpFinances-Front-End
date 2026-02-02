// Auto-generated from Swagger API
// Generated on: 2026-01-28T12:59:52.165Z
import { z } from 'zod'

export const NotificationsPutNotificationsByIdReadBodySchema = z.object({ "isRead": z.boolean() })
export type NotificationsPutNotificationsByIdReadBody = z.infer<typeof NotificationsPutNotificationsByIdReadBodySchema>
export const NotificationsPutNotificationsPreferencesBodySchema = z.object({ "emailNotifications": z.boolean().optional(), "inAppNotifications": z.boolean().optional(), "notifyExpenses": z.boolean().optional(), "notifyIncomes": z.boolean().optional(), "notifyDebts": z.boolean().optional(), "notifyBudgetAlerts": z.boolean().optional(), "notifyInvestmentAlerts": z.boolean().optional(), "notifyAccountTransfers": z.boolean().optional(), "dailyDigest": z.boolean().optional(), "digestTime": z.string().optional() })
export type NotificationsPutNotificationsPreferencesBody = z.infer<typeof NotificationsPutNotificationsPreferencesBodySchema>