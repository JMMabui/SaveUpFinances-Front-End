export interface incomeResponse {
  id: string
  userId: string
  createdAt: string
  date: string
  description: string
  amount: number
  sourceId: string
}

export interface incomeRequest {
  userId: string
  date: string
  description: string
  amount: number
  sourceId: string
}
