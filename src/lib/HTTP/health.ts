import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import { HealthGetResponseSchema } from '@/lib/openapi/zod/Health'

export function useHealthGet() {
  return useQuery({
    queryKey: ['get-health', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/health'
      const _url = _path
      const res = await apiService.get(_url)
      return HealthGetResponseSchema.safeParse(res).success ? HealthGetResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export { useHealthGet as useGetHealth }
