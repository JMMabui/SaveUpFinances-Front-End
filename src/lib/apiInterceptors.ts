import { apiClient } from './api'
import { authService } from './apiServices'

export interface ApiInterceptor {
  onRequest?: (config: RequestInit) => RequestInit
  onResponse?: (response: Response) => Response
  onError?: (error: any) => any
}

class ApiInterceptorManager {
  private interceptors: ApiInterceptor[] = []

  addInterceptor(interceptor: ApiInterceptor) {
    this.interceptors.push(interceptor)
  }

  removeInterceptor(interceptor: ApiInterceptor) {
    const index = this.interceptors.indexOf(interceptor)
    if (index > -1) {
      this.interceptors.splice(index, 1)
    }
  }

  async executeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    let config = { ...options }

    // Execute request interceptors
    for (const interceptor of this.interceptors) {
      if (interceptor.onRequest) {
        config = interceptor.onRequest(config)
      }
    }

    try {
      const response = await fetch(
        `${apiClient.config.baseURL}${endpoint}`,
        config
      )

      // Execute response interceptors
      for (const interceptor of this.interceptors) {
        if (interceptor.onResponse) {
          interceptor.onResponse(response)
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      // Execute error interceptors
      for (const interceptor of this.interceptors) {
        if (interceptor.onError) {
          interceptor.onError(error)
        }
      }
      throw error
    }
  }
}

// Create and configure interceptors
export const interceptorManager = new ApiInterceptorManager()

// Auth interceptor - automatically adds token to requests
interceptorManager.addInterceptor({
  onRequest: config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
})

// Logging interceptor - logs all requests and responses
interceptorManager.addInterceptor({
  onRequest: config => {
    console.log(`🚀 API Request:`, {
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body,
    })
    return config
  },
  onResponse: response => {
    console.log(`✅ API Response:`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })
    return response
  },
  onError: error => {
    console.error(`❌ API Error:`, error)
    return error
  },
})

// Token refresh interceptor
interceptorManager.addInterceptor({
  onError: async error => {
    if (error.status === 401) {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Try to refresh the token
          const refreshResult = await authService.refreshToken()
          if (refreshResult.data.token) {
            localStorage.setItem('token', refreshResult.data.token)
            // Retry the original request
            // This would need to be implemented in the main API client
            console.log('Token refreshed successfully')
          }
        } catch (_refreshError) {
          // If refresh fails, redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          window.location.href = '/login'
        }
      }
    }
    return error
  },
})

export { ApiInterceptorManager }
