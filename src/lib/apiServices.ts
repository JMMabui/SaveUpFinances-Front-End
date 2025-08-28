import { apiClient } from './api';
import { API_ENDPOINTS } from '../constants/api';
import type { ApiResponse } from '../HTTP/Type/response.type';
import type { AuthResponse, getAuthRequest } from '../HTTP/Type/authType';
import type { userResponse } from '../HTTP/Type/user.type';
import type { accountResponse } from '../HTTP/Type/account.type';

// Auth Services
export const authService = {
  login: async (data: getAuthRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data);
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REFRESH);
  },

  register: async (data: any): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data);
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token: string, password: string): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password });
  },
};

// User Services
export const userService = {
  getAll: async (): Promise<ApiResponse<userResponse[]>> => {
    return apiClient.get<ApiResponse<userResponse[]>>(API_ENDPOINTS.USERS.BASE);
  },

  getById: async (id: string): Promise<ApiResponse<userResponse>> => {
    return apiClient.get<ApiResponse<userResponse>>(API_ENDPOINTS.USERS.BY_ID(id));
  },

  create: async (data: Partial<userResponse>): Promise<ApiResponse<userResponse>> => {
    return apiClient.post<ApiResponse<userResponse>>(API_ENDPOINTS.USERS.BASE, data);
  },

  update: async (id: string, data: Partial<userResponse>): Promise<ApiResponse<userResponse>> => {
    return apiClient.put<ApiResponse<userResponse>>(API_ENDPOINTS.USERS.BY_ID(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.USERS.BY_ID(id));
  },

  getProfile: async (): Promise<ApiResponse<userResponse>> => {
    return apiClient.get<ApiResponse<userResponse>>(API_ENDPOINTS.USERS.PROFILE);
  },

  updateProfile: async (data: Partial<userResponse>): Promise<ApiResponse<userResponse>> => {
    return apiClient.put<ApiResponse<userResponse>>(API_ENDPOINTS.USERS.UPDATE_PROFILE, data);
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  },
};

// Account Services
export const accountService = {
  getByUserId: async (userId: string): Promise<ApiResponse<accountResponse[]>> => {
    return apiClient.get<ApiResponse<accountResponse[]>>(API_ENDPOINTS.ACCOUNTS.BY_USER_ID(userId));
  },

  getById: async (id: string): Promise<ApiResponse<accountResponse>> => {
    return apiClient.get<ApiResponse<accountResponse>>(API_ENDPOINTS.ACCOUNTS.BY_ID(id));
  },

  create: async (data: Partial<accountResponse>): Promise<ApiResponse<accountResponse>> => {
    return apiClient.post<ApiResponse<accountResponse>>(API_ENDPOINTS.ACCOUNTS.CREATE, data);
  },

  update: async (id: string, data: Partial<accountResponse>): Promise<ApiResponse<accountResponse>> => {
    return apiClient.put<ApiResponse<accountResponse>>(API_ENDPOINTS.ACCOUNTS.UPDATE(id), data);
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(API_ENDPOINTS.ACCOUNTS.DELETE(id));
  },
};

// Generic API service for dynamic endpoints
export const apiService = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiClient.get<ApiResponse<T>>(endpoint);
  },

  post: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.post<ApiResponse<T>>(endpoint, data);
  },

  put: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.put<ApiResponse<T>>(endpoint, data);
  },

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return apiClient.delete<ApiResponse<T>>(endpoint);
  },

  patch: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
    return apiClient.patch<ApiResponse<T>>(endpoint, data);
  },
};
