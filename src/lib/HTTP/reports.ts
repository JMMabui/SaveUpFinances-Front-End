import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import type {} from './Type/reports.type'

const _BASE = '/reports' as const

export function useReportsGetReportsDashboard(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/dashboard', params),
    enabled: true,
  })
}

export function useReportsGetReportsEvolution(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/evolution', params),
    enabled: true,
  })
}

export function useReportsGetReportsCashFlow(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/cash-flow', params),
    enabled: true,
  })
}

export function useReportsGetReportsNetWorth() {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/net-worth'),
    enabled: true,
  })
}

export function useReportsGetReportsExpenseAnalysis(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/expense-analysis', params),
    enabled: true,
  })
}

export function useReportsGetReportsIncomeAnalysis(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/income-analysis', params),
    enabled: true,
  })
}

export function useReportsGetReportsFinancialHealth() {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/financial-health'),
    enabled: true,
  })
}

export function useReportsGetReportsBudgetVsActual(params?: any) {
  return useQuery({
    queryKey: ['reports-get', params],
    queryFn: async () => apiService.get('/reports/budget-vs-actual', params),
    enabled: true,
  })
}
