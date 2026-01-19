export interface expensesResponse {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  date: string
  description: string
  amount: number
  categoryId: string
}

export interface expensesRequest {
  userId: string
  date: string
  description: string
  amount: number
  categoryId: string
}
