// API Base Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:7410',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },

  // Accounts
  ACCOUNTS: {
    BASE: '/accounts',
    BY_ID: (id: string) => `/accounts/${id}`,
    BY_USER_ID: (userId: string) => `/accounts/${userId}`,
    CREATE: '/accounts',
    UPDATE: (id: string) => `/accounts/${id}`,
    DELETE: (id: string) => `/accounts/${id}`,
  },

  // Transactions
  TRANSACTIONS: {
    BASE: '/transactions',
    BY_ID: (id: string) => `/transactions/${id}`,
    BY_ACCOUNT_ID: (accountId: string) => `/transactions/account/${accountId}`,
    BY_USER_ID: (userId: string) => `/transactions/user/${userId}`,
    CREATE: '/transactions',
    UPDATE: (id: string) => `/transactions/${id}`,
    DELETE: (id: string) => `/transactions/${id}`,
  },

  // Categories
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
    BY_TYPE: (type: string) => `/categories/type/${type}`,
  },

  // Reports
  REPORTS: {
    BASE: '/reports',
    EXPENSE_SUMMARY: '/reports/expense-summary',
    INCOME_SUMMARY: '/reports/income-summary',
    BALANCE_SHEET: '/reports/balance-sheet',
    CASH_FLOW: '/reports/cash-flow',
    BY_PERIOD: (startDate: string, endDate: string) => 
      `/reports/period/${startDate}/${endDate}`,
  },

  // Settings
  SETTINGS: {
    BASE: '/settings',
    USER_PREFERENCES: '/settings/preferences',
    NOTIFICATIONS: '/settings/notifications',
    CURRENCY: '/settings/currency',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'Unauthorized access. Please login again.',
  FORBIDDEN: 'Access forbidden. You don\'t have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Internal server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;
