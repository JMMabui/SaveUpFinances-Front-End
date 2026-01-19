export interface investmentResponse {
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  targetAmount: number
  currentAmount: number
  targetDate: Date
}

export interface investmentRequest {
  name: string
  targetAmount: number
  currentAmount: number
  targetDate: string
}
