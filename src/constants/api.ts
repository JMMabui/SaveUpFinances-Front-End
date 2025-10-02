
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
    REGISTER: '/users',
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
    BY_USER_ID: (userId: string) => `/account/${userId}`,
    CREATE: '/accounts',
    UPDATE: (id: string) => `/accounts/${id}`,
    DELETE: (id: string) => `/accounts/${id}`,
  },

  // Accounts Balance
  ACCOUNTS_BALANCE: {
    BASE: '/accounts-balance',
    BY_ID: (id: string) => `/accounts-balance/${id}`,
    BY_ACCOUNT_ID: (accountId: string) => `/accounts-balance/account/${accountId}`,
    CREATE: '/accounts-balance',
    UPDATE: (id: string) => `/accounts-balance/${id}`,
    DELETE: (id: string) => `/accounts-balance/${id}`,
  },

   // Accounts source
  ACCOUNTS_SOURCE: {
    BASE: '/accounts-source',
    BY_ID: (id: string) => `/accounts-source/${id}`,
    BY_ACCOUNT_ID: (accountId: string) => `/accounts-source/account/${accountId}`,
    CREATE: '/accounts-source',
    UPDATE: (id: string) => `/accounts-source/${id}`,
    DELETE: (id: string) => `/accounts-source/${id}`,
  },

  // Credit Cards
  CREDIT_CARDS: {
    BASE: '/credit-cards',
    BY_ID: (id: string) => `/credit-cards/${id}`,
    CREATE: 'credit-cards',
    UPDATE: (id: string) => `/credit-cards/${id}`,
    DELETE: (id: string) => `/credit-cards/${id}`,
  },

  // debts
  DEBTS: {
    BASE: '/debts',
    BY_ID: (id: string) => `/debts/${id}`,
    CREATE: 'debts',
    UPDATE: (id: string) => `/debts/${id}`,
    DELETE: (id: string) => `/debts/${id}`,
  },

  // debt Payments
  DEBT_Payments: {
    BASE: '/debt-payments',
    BY_ID: (id: string) => `/debt-payments/${id}`,
    CREATE: 'debt-payments',
    UPDATE: (id: string) => `/debt-payments/${id}`,
    DELETE: (id: string) => `/debt-payments/${id}`,
  },

  // Budgets
  BUDGET: {
    BASE: '/budget',
    BY_ID: (id: string) => `/budget/${id}`,
    BY_USER_ID: (userId: string) => `/budget/user/${userId}`,
    CREATE: 'budget',
    UPDATE: (id: string) => `/budget/${id}`,
    DELETE: (id: string) => `/budget/${id}`,
  },

  // Banks
    BANKS: {
    BASE: '/banks',
    BY_ID: (id: string) => `/banks/${id}`,
    CREATE: 'banks',
    UPDATE: (id: string) => `/banks/${id}`,
    DELETE: (id: string) => `/banks/${id}`,
  }, 

  // Categories
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
    BY_TYPE: (type: string) => `/categories/type/${type}`,
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,  
  },

  // Expenses
  EXPENSES: {
    BASE: '/expenses',
    BY_ID: (id: string) => `/expenses/${id}`,
    CREATE: '/expenses',
    UPDATE: (id: string) => `/expenses/${id}`,
    DELETE: (id: string) => `/expenses/${id}`,
  },

  // Incomes
  INCOMES: {
    BASE: '/income',
    BY_ID: (id: string) => `/income/${id}`,
    CREATE: '/income',
    UPDATE: (id: string) => `/income/${id}`,
    DELETE: (id: string) => `/income/${id}`,
  },

  // Income Source
  INCOME_SOURCE: {
    BASE: '/income-source',
    BY_ID: (id: string) => `/income-source/${id}`,
    CREATE: '/income-source',
    UPDATE: (id: string) => `/income-source/${id}`,
    DELETE: (id: string) => `/income-source/${id}`,
  },

  // investment
  INVESTMENT:{
    BASE: '/investment',
    BY_ID: (id: string) => `/investment/${id}`,
    CREATE: '/investment',
    UPDATE: (id: string) => `/investment/${id}`,
    DELETE: (id: string) => `/investment/${id}`,
  },

  // investment goals
  INVESTMENT_Goals:{
    BASE: '/investment-goals',
    BY_ID: (id: string) => `/investment-goals/${id}`,
    CREATE: '/investment-goals',
    UPDATE: (id: string) => `/investment-goals/${id}`,
    DELETE: (id: string) => `/investment-goals/${id}`,
  },

  // Transactions
  TRANSACTIONS: {
    BASE: '/transaction',
    BY_ID: (id: string) => `/transaction/${id}`,
    BY_ACCOUNT_ID: (accountId: string) => `/transaction/account/${accountId}`,
    BY_USER_ID: (userId: string) => `/transaction/user/${userId}`,
    CREATE: '/transaction',
    UPDATE: (id: string) => `/transaction/${id}`,
    DELETE: (id: string) => `/transaction/${id}`,
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
