import { API_ENDPOINTS } from '../constants/api'
import { apiClient } from './api'
import type { bankResponde } from './HTTP/Type/banks.type'
import type { ApiResponse } from './HTTP/Type/response.type'

// Banks Services
export const bankService = {
  getAll: async (): Promise<ApiResponse<bankResponde[]>> => {
    return apiClient.get<ApiResponse<bankResponde[]>>(API_ENDPOINTS.BANKS.BASE)
  },

  getById: async (id: string): Promise<ApiResponse<bankResponde>> => {
    return apiClient.get<ApiResponse<bankResponde>>(
      API_ENDPOINTS.BANKS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<bankResponde>
  ): Promise<ApiResponse<bankResponde>> => {
    return apiClient.post<ApiResponse<bankResponde>>(
      API_ENDPOINTS.BANKS.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<bankResponde>
  ): Promise<ApiResponse<bankResponde>> => {
    return apiClient.put<ApiResponse<bankResponde>>(
      API_ENDPOINTS.BANKS.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.BANKS.DELETE(id))
  },
}
