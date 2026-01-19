import { env } from '@/env'

// Environment configuration
export const environment = {
  development: {
    apiUrl: 'http://localhost:7410',
    timeout: 10000,
    enableLogging: true,
    enableMockData: false,
  },
  production: {
    apiUrl: env.VITE_API_URL || 'https://api.saveupfinances.com',
    timeout: 30000,
    enableLogging: false,
    enableMockData: false,
  },
  test: {
    apiUrl: 'http://localhost:7410',
    timeout: 5000,
    enableLogging: false,
    enableMockData: true,
  },
}

// Get current environment
export const getCurrentEnvironment = () => {
  const nodeEnv = env.MODE || 'development'
  return (
    environment[nodeEnv as keyof typeof environment] || environment.development
  )
}

// API Configuration
export const apiConfig = {
  baseURL: env.VITE_API_URL || getCurrentEnvironment().apiUrl,
  timeout: getCurrentEnvironment().timeout,
  enableLogging: getCurrentEnvironment().enableLogging,
  enableMockData: getCurrentEnvironment().enableMockData,
}

// Feature flags
export const features = {
  enableAnalytics: env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebugMode: env.VITE_DEBUG_MODE === 'true',
  enablePerformanceMonitoring:
    env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
}

// App configuration
export const appConfig = {
  name: 'SaveUpFinances',
  version: '1.2.0',
  description: 'Sistema de gestão financeira pessoal',
  author: 'SaveUpFinances Team',
  supportEmail: 'support@saveupfinances.com',
}
