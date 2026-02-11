import { API_ENDPOINTS } from '../constants/api'
import { apiClient } from './api'
import type { bankResponse } from './HTTP/Type/banks.type'
import type { ApiResponse } from './HTTP/Type/response.type'

// Banks Services
export const bankService = {
  getAll: async (): Promise<ApiResponse<bankResponse[]>> => {
    return apiClient.get<ApiResponse<bankResponse[]>>(API_ENDPOINTS.BANKS.BASE)
  },

  getById: async (id: string): Promise<ApiResponse<bankResponse>> => {
    return apiClient.get<ApiResponse<bankResponse>>(
      API_ENDPOINTS.BANKS.BY_ID(id)
    )
  },

  create: async (
    data: Partial<bankResponse>
  ): Promise<ApiResponse<bankResponse>> => {
    return apiClient.post<ApiResponse<bankResponse>>(
      API_ENDPOINTS.BANKS.CREATE,
      data
    )
  },

  update: async (
    id: string,
    data: Partial<bankResponse>
  ): Promise<ApiResponse<bankResponse>> => {
    return apiClient.put<ApiResponse<bankResponse>>(
      API_ENDPOINTS.BANKS.UPDATE(id),
      data
    )
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.BANKS.DELETE(id))
  },
}
