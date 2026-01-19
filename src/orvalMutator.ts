import Axios, { type AxiosRequestConfig } from 'axios'
import { env } from './env'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: env.VITE_API_URL || 'http://localhost:7410',
})

export const customAxios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
