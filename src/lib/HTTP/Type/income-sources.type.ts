export interface incomeSourceResponse {
  name: string
  frequency: string
  startDate: string
  endDate: string | null
  id: string
  isActive: boolean
  userId: string
  createdAt: string
}

export interface incomeSourceRequest {
  name: string
  frequency: string
  startDate: string
  endDate: string | null
  userId: string
}
