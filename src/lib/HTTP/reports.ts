import { useQuery } from '@tanstack/react-query'
import { apiService } from '../apiServices'
import { ReportsGetDashboardResponseSchema, ReportsGetEvolutionResponseSchema, ReportsGetCashFlowResponseSchema, ReportsGetNetWorthResponseSchema, ReportsGetExpenseAnalysisResponseSchema, ReportsGetIncomeAnalysisResponseSchema, ReportsGetFinancialHealthResponseSchema, ReportsGetBudgetVsActualResponseSchema } from '@/lib/openapi/zod/Reports'

export function useReportsGetDashboard(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/dashboard'
      const _usp = new URLSearchParams()
      if ((params ?? {})['month'] !== undefined && (params ?? {})['month'] !== null) { _usp.append('month', String((params ?? {})['month'])) }
      if ((params ?? {})['year'] !== undefined && (params ?? {})['year'] !== null) { _usp.append('year', String((params ?? {})['year'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetDashboardResponseSchema.safeParse(res).success ? ReportsGetDashboardResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetEvolution(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/evolution'
      const _usp = new URLSearchParams()
      if ((params ?? {})['year'] !== undefined && (params ?? {})['year'] !== null) { _usp.append('year', String((params ?? {})['year'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetEvolutionResponseSchema.safeParse(res).success ? ReportsGetEvolutionResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetCashFlow(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/cash-flow'
      const _usp = new URLSearchParams()
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetCashFlowResponseSchema.safeParse(res).success ? ReportsGetCashFlowResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetNetWorth() {
  return useQuery({
    queryKey: ['get-reports', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/net-worth'
      const _url = _path
      const res = await apiService.get(_url)
      return ReportsGetNetWorthResponseSchema.safeParse(res).success ? ReportsGetNetWorthResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetExpenseAnalysis(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/expense-analysis'
      const _usp = new URLSearchParams()
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetExpenseAnalysisResponseSchema.safeParse(res).success ? ReportsGetExpenseAnalysisResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetIncomeAnalysis(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/income-analysis'
      const _usp = new URLSearchParams()
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetIncomeAnalysisResponseSchema.safeParse(res).success ? ReportsGetIncomeAnalysisResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetFinancialHealth() {
  return useQuery({
    queryKey: ['get-reports', undefined],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/financial-health'
      const _url = _path
      const res = await apiService.get(_url)
      return ReportsGetFinancialHealthResponseSchema.safeParse(res).success ? ReportsGetFinancialHealthResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}

export function useReportsGetBudgetVsActual(params?: any) {
  return useQuery({
    queryKey: ['get-reports', params],
    queryFn: async (): Promise<any> => {
      const _path = '/reports/budget-vs-actual'
      const _usp = new URLSearchParams()
      if ((params ?? {})['dateFrom'] !== undefined && (params ?? {})['dateFrom'] !== null) { _usp.append('dateFrom', String((params ?? {})['dateFrom'])) }
      if ((params ?? {})['dateTo'] !== undefined && (params ?? {})['dateTo'] !== null) { _usp.append('dateTo', String((params ?? {})['dateTo'])) }
      const _url = _path + (_usp.toString() ? `?${_usp.toString()}` : '')
      const res = await apiService.get(_url)
      return ReportsGetBudgetVsActualResponseSchema.safeParse(res).success ? ReportsGetBudgetVsActualResponseSchema.parse(res) : res
    },
    enabled: true,
  })
}
