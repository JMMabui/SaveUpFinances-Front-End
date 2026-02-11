import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {} from './Type/default.type'

export function useDefaultGetIncomeSourcesUserByUserId(params?: any) {
  return useQuery({
    queryKey: ['default-get', params],
    queryFn: async () => {
      const url = '/income-sources/user/{userId}'.replace(
        '{userId}',
        encodeURIComponent(String((params ?? {}).userId ?? ''))
      )
      return apiService.get(url)
    },
    enabled: Object.values(params || {}).every(Boolean),
  })
}
