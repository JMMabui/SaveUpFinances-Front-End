import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'

const _BASE = '/health' as const

export function useHealthGetHealth() {
  return useQuery({
    queryKey: ['health-get', params],
    queryFn: async () => apiService.get('/health'),
    enabled: true,
  })
}
