import { API_ENDPOINTS } from '../constants/api'
import { apiClient } from './api'
import type { accountResponse } from './HTTP/Type/account.type'
import type { accountBalanceResponse } from './HTTP/Type/account-balance.type'
import type { accountSourceResponse } from './HTTP/Type/account-source.type'
import type { AuthResponse, getAuthRequest } from './HTTP/Type/authType'
import type { budgetResponse } from './HTTP/Type/budget.type'
import type { creditCardResponse } from './HTTP/Type/credit-card.type'
import type { debtsResponse } from './HTTP/Type/debts.type'
import type { debtPaymentsResponse } from './HTTP/Type/debts-payments.type'
import type { ApiResponse } from './HTTP/Type/response.type'
import type { userResponse } from './HTTP/Type/user.type'

// CSRF Token Management
let csrfTokenCache: string | null = null

const fetchCSRFToken = async (): Promise<string> => {
  try {
    if (csrfTokenCache) {
      return csrfTokenCache
    }

    const response = await apiClient.get<{ token: string }>(
      API_ENDPOINTS.AUTH.CSRF
    )
    const token = response?.token || null

    if (token) {
      csrfTokenCache = token
    }

    return token || ''
  } catch (error) {
    console.warn('Falha ao obter CSRF token:', error)
    return ''
  }
}

const storageCSRFToken = (): string | null => {
  return localStorage.getItem('csrf_token')
}

// Auth Services
export const authService = {
  login: async (data: getAuthRequest): Promise<ApiResponse<AuthResponse>> => {
    // Buscar CSRF token antes do login
    await fetchCSRFToken()

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    )
    // console.log("Login response:", response);

    // Armazenar token e refreshToken
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)

      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken)
      }

      if (response.data.user?.id) {
        localStorage.setItem('userId', response.data.user.id)
      }
    }

    return response
  },

  logout: async (): Promise<void> => {
    try {
      // Tenta fazer logout no servidor
      const token = localStorage.getItem('token')
      if (token) {
        await apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT)
      }
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error)
    } finally {
      // Limpa dados locais independente do resultado do logout no servidor
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
      localStorage.removeItem('csrf_token')
      csrfTokenCache = null
    }
  },

  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    )

    // Atualizar token
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)

      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken)
      }
    }

    return response
  },

  register: async (data: any): Promise<ApiResponse<AuthResponse>> => {
    // Buscar CSRF token antes do registro
    await fetchCSRFToken()

    return apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    )
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    await fetchCSRFToken()

    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    )
  },

  resetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse<void>> => {
    await fetchCSRFToken()

    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, password }
    )
  },

  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    await fetchCSRFToken()

    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      {
        oldPassword,
        newPassword,
      }
    )
  },

  getCurrentUser: async (
    userId: string
  ): Promise<ApiResponse<userResponse>> => {
    return apiClient.get<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.PROFILE(userId)
    )
  },

  initializeCSRFToken: fetchCSRFToken,
  getCSRFToken: storageCSRFToken,
}

// User Services
export const userService = {
  getAll: async (): Promise<ApiResponse<userResponse[]>> => {
    return apiClient.get<ApiResponse<userResponse[]>>(API_ENDPOINTS.USERS.BASE)
  },

  getById: async (id: string): Promise<ApiResponse<userResponse>> => {
    return apiClient.get<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<userResponse>
  ): Promise<ApiResponse<userResponse>> => {
    return apiClient.post<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.BASE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<userResponse>
  ): Promise<ApiResponse<userResponse>> => {
    return apiClient.put<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.BY_ID(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.USERS.BY_ID(id))
  },

  getProfile: async (userId: string): Promise<ApiResponse<userResponse>> => {
    return apiClient.get<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.PROFILE(userId)
    )
  },

  updateProfile: async (
    data: Partial<userResponse>
  ): Promise<ApiResponse<userResponse>> => {
    return apiClient.put<ApiResponse<userResponse>>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      data
    )
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      {
        currentPassword,
        newPassword,
      }
    )
  },
}

// Account Services
export const accountService = {
  getByUserId: async (
    userId: string
  ): Promise<ApiResponse<accountResponse[]>> => {
    return apiClient.get<ApiResponse<accountResponse[]>>(
      API_ENDPOINTS.ACCOUNTS.BY_USER_ID(userId)
    )
  },

  getById: async (id: string): Promise<ApiResponse<accountResponse>> => {
    return apiClient.get<ApiResponse<accountResponse>>(
      API_ENDPOINTS.ACCOUNTS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<accountResponse>
  ): Promise<ApiResponse<accountResponse>> => {
    return apiClient.post<ApiResponse<accountResponse>>(
      API_ENDPOINTS.ACCOUNTS.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<accountResponse>
  ): Promise<ApiResponse<accountResponse>> => {
    return apiClient.put<ApiResponse<accountResponse>>(
      API_ENDPOINTS.ACCOUNTS.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.ACCOUNTS.DELETE(id)
    )
  },
}

export const accountsService = accountService

// Account Balance Services
export const accountBalanceService = {
  getAll: async (): Promise<ApiResponse<accountBalanceResponse[]>> => {
    return apiClient.get<ApiResponse<accountBalanceResponse[]>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.BASE
    )
  },

  getById: async (id: string): Promise<ApiResponse<accountBalanceResponse>> => {
    return apiClient.get<ApiResponse<accountBalanceResponse>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.BY_ID(id)
    )
  },

  getByAccountId: async (
    accountId: string
  ): Promise<ApiResponse<accountBalanceResponse[]>> => {
    return apiClient.get<ApiResponse<accountBalanceResponse[]>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.BY_ACCOUNT_ID(accountId)
    )
  },

  create: async (
    data: Partial<accountBalanceResponse>
  ): Promise<ApiResponse<accountBalanceResponse>> => {
    return apiClient.post<ApiResponse<accountBalanceResponse>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<accountBalanceResponse>
  ): Promise<ApiResponse<accountBalanceResponse>> => {
    return apiClient.put<ApiResponse<accountBalanceResponse>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.ACCOUNTS_BALANCE.DELETE(id)
    )
  },
}

// Account Source Services
export const accountSourceService = {
  getAll: async (): Promise<ApiResponse<accountSourceResponse[]>> => {
    return apiClient.get<ApiResponse<accountSourceResponse[]>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.BASE
    )
  },

  getById: async (id: string): Promise<ApiResponse<accountSourceResponse>> => {
    return apiClient.get<ApiResponse<accountSourceResponse>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.BY_ID(id)
    )
  },

  getByAccountId: async (
    accountId: string
  ): Promise<ApiResponse<accountSourceResponse[]>> => {
    return apiClient.get<ApiResponse<accountSourceResponse[]>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.BY_ACCOUNT_ID(accountId)
    )
  },

  create: async (
    data: Partial<accountSourceResponse>
  ): Promise<ApiResponse<accountSourceResponse>> => {
    return apiClient.post<ApiResponse<accountSourceResponse>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<accountSourceResponse>
  ): Promise<ApiResponse<accountSourceResponse>> => {
    return apiClient.put<ApiResponse<accountSourceResponse>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.ACCOUNTS_SOURCE.DELETE(id)
    )
  },
}

// Credit Card Services
export const creditCardService = {
  getAll: async (): Promise<ApiResponse<creditCardResponse[]>> => {
    return apiClient.get<ApiResponse<creditCardResponse[]>>(
      API_ENDPOINTS.CREDIT_CARDS.BASE
    )
  },

  getById: async (id: string): Promise<ApiResponse<creditCardResponse>> => {
    return apiClient.get<ApiResponse<creditCardResponse>>(
      API_ENDPOINTS.CREDIT_CARDS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<creditCardResponse>
  ): Promise<ApiResponse<creditCardResponse>> => {
    return apiClient.post<ApiResponse<creditCardResponse>>(
      API_ENDPOINTS.CREDIT_CARDS.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<creditCardResponse>
  ): Promise<ApiResponse<creditCardResponse>> => {
    return apiClient.put<ApiResponse<creditCardResponse>>(
      API_ENDPOINTS.CREDIT_CARDS.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.CREDIT_CARDS.DELETE(id)
    )
  },
}

// Debts Services
export const debtsService = {
  getAll: async (): Promise<ApiResponse<debtsResponse[]>> => {
    return apiClient.get<ApiResponse<debtsResponse[]>>(API_ENDPOINTS.DEBTS.BASE)
  },

  getById: async (id: string): Promise<ApiResponse<debtsResponse>> => {
    return apiClient.get<ApiResponse<debtsResponse>>(
      API_ENDPOINTS.DEBTS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<debtsResponse>
  ): Promise<ApiResponse<debtsResponse>> => {
    return apiClient.post<ApiResponse<debtsResponse>>(
      API_ENDPOINTS.DEBTS.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<debtsResponse>
  ): Promise<ApiResponse<debtsResponse>> => {
    return apiClient.put<ApiResponse<debtsResponse>>(
      API_ENDPOINTS.DEBTS.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.DEBTS.DELETE(id))
  },
}

// Debt Payments Services
export const debtPaymentsService = {
  getAll: async (): Promise<ApiResponse<debtPaymentsResponse[]>> => {
    return apiClient.get<ApiResponse<debtPaymentsResponse[]>>(
      API_ENDPOINTS.DEBT_Payments.BASE
    )
  },

  getById: async (id: string): Promise<ApiResponse<debtPaymentsResponse>> => {
    return apiClient.get<ApiResponse<debtPaymentsResponse>>(
      API_ENDPOINTS.DEBT_Payments.BY_ID(id)
    )
  },

  create: async (
    data: Partial<debtPaymentsResponse>
  ): Promise<ApiResponse<debtPaymentsResponse>> => {
    return apiClient.post<ApiResponse<debtPaymentsResponse>>(
      API_ENDPOINTS.DEBT_Payments.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<debtPaymentsResponse>
  ): Promise<ApiResponse<debtPaymentsResponse>> => {
    return apiClient.put<ApiResponse<debtPaymentsResponse>>(
      API_ENDPOINTS.DEBT_Payments.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.DEBT_Payments.DELETE(id)
    )
  },
}

// Budget Services
export const budgetService = {
  getAll: async (): Promise<ApiResponse<budgetResponse[]>> => {
    return apiClient.get<ApiResponse<budgetResponse[]>>(
      API_ENDPOINTS.BUDGET.BASE
    )
  },

  getById: async (id: string): Promise<ApiResponse<budgetResponse>> => {
    return apiClient.get<ApiResponse<budgetResponse>>(
      API_ENDPOINTS.BUDGET.BY_ID(id)
    )
  },

  getByUserId: async (
    userId: string
  ): Promise<ApiResponse<budgetResponse[]>> => {
    return apiClient.get<ApiResponse<budgetResponse[]>>(
      API_ENDPOINTS.BUDGET.BY_USER_ID(userId)
    )
  },

  create: async (
    data: Partial<budgetResponse>
  ): Promise<ApiResponse<budgetResponse>> => {
    return apiClient.post<ApiResponse<budgetResponse>>(
      API_ENDPOINTS.BUDGET.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<budgetResponse>
  ): Promise<ApiResponse<budgetResponse>> => {
    return apiClient.put<ApiResponse<budgetResponse>>(
      API_ENDPOINTS.BUDGET.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.BUDGET.DELETE(id))
  },
}

// Banks Services
export const banksService = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get<ApiResponse<any[]>>(API_ENDPOINTS.BANKS.BASE)
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(API_ENDPOINTS.BANKS.BY_ID(id))
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.post<ApiResponse<any>>(API_ENDPOINTS.BANKS.CREATE, data)
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(API_ENDPOINTS.BANKS.UPDATE(id), data)
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.BANKS.DELETE(id))
  },
}

// Users/Profile Services
export const userProfileService = {
  getProfile: async (userId: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(API_ENDPOINTS.USERS.PROFILE(userId))
  },

  updateProfile: async (
    userId: string,
    data: any
  ): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(
      API_ENDPOINTS.USERS.PROFILE(userId),
      data
    )
  },

  getSettings: async (userId: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/users/${userId}/settings`)
  },

  updateSettings: async (
    userId: string,
    data: any
  ): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/users/${userId}/settings`, data)
  },

  changePassword: async (
    userId: string,
    data: any
  ): Promise<ApiResponse<any>> => {
    return apiClient.post<ApiResponse<any>>(
      `/users/${userId}/change-password`,
      data
    )
  },
}

// Notifications Services
export const notificationsService = {
  getAll: async (
    page: number = 1,
    pageSize: number = 20
  ): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(
      `/notifications?page=${page}&pageSize=${pageSize}`
    )
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/notifications/${id}`)
  },

  markAsRead: async (
    id: string,
    isRead: boolean
  ): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/notifications/${id}/read`, {
      isRead,
    })
  },

  markAllAsRead: async (): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/notifications/read-all`, {})
  },

  getUnreadCount: async (): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/notifications/unread-count`)
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/notifications/${id}`)
  },

  deleteAll: async (): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/notifications`)
  },

  getPreferences: async (): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/notifications/preferences`)
  },

  updatePreferences: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/notifications/preferences`, data)
  },
}

// Reports/Financial Analysis Services
export const reportsService = {
  getDashboard: async (
    month: number,
    year: number
  ): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(
      `/reports/dashboard?month=${month}&year=${year}`
    )
  },

  getEvolution: async (year?: number): Promise<ApiResponse<any>> => {
    const query = year ? `?year=${year}` : ''
    return apiClient.get<ApiResponse<any>>(`/reports/evolution${query}`)
  },

  getCashFlow: async (
    dateFrom?: string,
    dateTo?: string
  ): Promise<ApiResponse<any>> => {
    const query = new URLSearchParams()
    if (dateFrom) query.append('dateFrom', dateFrom)
    if (dateTo) query.append('dateTo', dateTo)
    return apiClient.get<ApiResponse<any>>(
      `/reports/cash-flow${query.toString() ? `?${query.toString()}` : ''}`
    )
  },

  getNetWorth: async (): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/reports/net-worth`)
  },

  getExpenseAnalysis: async (
    dateFrom?: string,
    dateTo?: string
  ): Promise<ApiResponse<any>> => {
    const query = new URLSearchParams()
    if (dateFrom) query.append('dateFrom', dateFrom)
    if (dateTo) query.append('dateTo', dateTo)
    return apiClient.get<ApiResponse<any>>(
      `/reports/expense-analysis${query.toString() ? `?${query.toString()}` : ''}`
    )
  },

  getIncomeAnalysis: async (
    dateFrom?: string,
    dateTo?: string
  ): Promise<ApiResponse<any>> => {
    const query = new URLSearchParams()
    if (dateFrom) query.append('dateFrom', dateFrom)
    if (dateTo) query.append('dateTo', dateTo)
    return apiClient.get<ApiResponse<any>>(
      `/reports/income-analysis${query.toString() ? `?${query.toString()}` : ''}`
    )
  },

  getFinancialHealth: async (): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/reports/financial-health`)
  },

  getBudgetVsActual: async (
    dateFrom?: string,
    dateTo?: string
  ): Promise<ApiResponse<any>> => {
    const query = new URLSearchParams()
    if (dateFrom) query.append('dateFrom', dateFrom)
    if (dateTo) query.append('dateTo', dateTo)
    return apiClient.get<ApiResponse<any>>(
      `/reports/budget-vs-actual${query.toString() ? `?${query.toString()}` : ''}`
    )
  },
}

// Debt Payments Additional Services
export const debtPaymentsDetailService = {
  getByDebtId: async (
    debtId: string
  ): Promise<ApiResponse<debtPaymentsResponse[]>> => {
    return apiClient.get<ApiResponse<debtPaymentsResponse[]>>(
      `/debt-payments/debt/${debtId}`
    )
  },
}

// Investment Goals Services
export const investmentGoalsService = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get<ApiResponse<any[]>>(`/investment-goal`)
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/investment-goal/${id}`)
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.post<ApiResponse<any>>(`/investment-goal`, data)
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/investment-goal/${id}`, data)
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/investment-goal/${id}`)
  },
}

// Investment Types Services (similar to investment goals but for types)
export const investmentTypesService = {
  // Use categories endpoint filtered by type or custom endpoint if available
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get<ApiResponse<any[]>>(`/categories?type=investment`)
  },

  getById: async (id: string): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/categories/${id}`)
  },

  create: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.post<ApiResponse<any>>(`/categories`, {
      ...data,
      categoryType: 'investment',
    })
  },

  update: async (id: string, data: any): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/categories/${id}`, data)
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/categories/${id}`)
  },
}

// Generic API service for dynamic endpoints
export const apiService = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiClient.get<ApiResponse<T>>(endpoint)
  },

  post: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.post<ApiResponse<T>>(endpoint, data)
  },

  put: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.put<ApiResponse<T>>(endpoint, data)
  },

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiClient.delete<ApiResponse<T>>(endpoint)
  },

  patch: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.patch<ApiResponse<T>>(endpoint, data)
  },
}
