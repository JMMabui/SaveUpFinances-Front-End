import { apiClient } from './api'

type OrvalConfig = {
  url: string
  method?: string
  body?: any
  headers?: Record<string, string>
}

export const orvalMutator = async (config: OrvalConfig) => {
  const { url, method = 'GET', body, headers } = config

  // Converte URL absoluto em endpoint relativo para usar `apiClient`
  const parsed = new URL(url)
  const endpoint = `${parsed.pathname}${parsed.search}${parsed.hash || ''}`

  const opts = {
    headers: {
      ...(headers || {}),
    },
    credentials: 'include',
  } as RequestInit

  switch (method.toUpperCase()) {
    case 'GET':
      return apiClient.get(endpoint, opts as RequestInit)
    case 'POST':
      return apiClient.post(endpoint, body, opts as RequestInit)
    case 'PUT':
      return apiClient.put(endpoint, body, opts as RequestInit)
    case 'PATCH':
      return apiClient.patch(endpoint, body, opts as RequestInit)
    case 'DELETE':
      return apiClient.delete(endpoint, opts as RequestInit)
    default:
      return apiClient.get(endpoint, opts as RequestInit)
  }
}
