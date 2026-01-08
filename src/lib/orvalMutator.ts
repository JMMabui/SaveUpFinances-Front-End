import { apiClient } from './api';

type OrvalConfig = {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
};

export const orvalMutator = async (config: OrvalConfig) => {
  const { url, method = 'GET', body, headers } = config;

  // Converte URL absoluto em endpoint relativo para usar `apiClient`
  const parsed = new URL(url);
  const endpoint = `${parsed.pathname}${parsed.search}${parsed.hash || ''}`;

  const requestInit: RequestInit = {
    method,
    headers: {
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  } as RequestInit;

  return apiClient.request(endpoint, requestInit as RequestInit);
};
