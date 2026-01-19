import Axios, { type AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7410',
  withCredentials: true,
})

AXIOS_INSTANCE.interceptors.request.use(config => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (token) {
    config.headers = config.headers || {}
    ;(config.headers as Record<string, string>).Authorization =
      `Bearer ${token}`
  }
  return config
})

AXIOS_INSTANCE.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await AXIOS_INSTANCE.post('/auth/refresh-token')
        return AXIOS_INSTANCE(originalRequest)
      } catch {
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

export const customAxios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const p: any = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)
  p.cancel = () => {
    source.cancel('Query was cancelled')
  }
  return p as Promise<T>
}
