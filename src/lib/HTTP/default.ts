import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {} from './Type/default.type'

const _BASE = '/default' as const

export function useDefaultGetIncomeSourcesUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['default-get', params],
    queryFn: async () =>
      apiService.get('/income-sources/user/{userId}', params),
    enabled: Object.values(params || {}).every(Boolean),
  })
}
