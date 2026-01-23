import { apiClient } from '@/lib/api'
import { AllRoutes } from './routes'

function getRouteByName(name: string) {
  return AllRoutes.find(r => r.name === name)
}

function buildPath(path: string, params?: Record<string, any>) {
  if (!params) return path
  return path.replace(/\{([^}]+)\}/g, (_, key) =>
    encodeURIComponent(params[key] ?? '')
  )
}

function buildQuery(query?: Record<string, any>) {
  if (!query || Object.keys(query).length === 0) return ''
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue
    usp.append(k, String(v))
  }
  const s = usp.toString()
  return s ? `?${s}` : ''
}

export async function callOpenApi<TResponse = unknown>(
  name: string,
  opts?: {
    params?: Record<string, any>
    query?: Record<string, any>
    body?: any
  }
) {
  const def = getRouteByName(name)
  if (!def) throw new Error(`Route not found: ${name}`)
  const url = buildPath(def.path, opts?.params) + buildQuery(opts?.query)
  switch (def.method) {
    case 'GET':
      return apiClient.get<TResponse>(url)
    case 'POST':
      return apiClient.post<TResponse>(url, opts?.body)
    case 'PUT':
      return apiClient.put<TResponse>(url, opts?.body)
    case 'PATCH':
      return apiClient.patch<TResponse>(url, opts?.body)
    case 'DELETE':
      return apiClient.delete<TResponse>(url)
    default:
      throw new Error(`Unsupported method: ${def.method}`)
  }
}
