import { useCallback, useState } from 'react'
import { ApiError } from '../lib/api'

export interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await apiCall()
      setState({ data: result, loading: false, error: null })
      return result
    } catch (error) {
      let errorMessage = 'An unexpected error occurred'

      if (error instanceof ApiError) {
        errorMessage = error.message

        // Handle specific HTTP status codes
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized access. Please login again.'
            // Redirect to login or refresh token
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            break
          case 403:
            errorMessage =
              "Access forbidden. You don't have permission to perform this action."
            break
          case 404:
            errorMessage = 'Resource not found.'
            break
          case 500:
            errorMessage = 'Internal server error. Please try again later.'
            break
          case 408:
            errorMessage =
              'Request timeout. Please check your connection and try again.'
            break
          default:
            errorMessage = error.message || `HTTP Error ${error.status}`
        }
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    execute,
    reset,
    setError,
    clearError,
  }
}
