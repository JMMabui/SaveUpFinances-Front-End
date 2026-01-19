export interface accountBalanceRequest {
  accountId: string
  date: string
  balance: number
}

export interface accountBalanceResponse {
  id: string
  accountId: string
  date: string
  balance: number
  createdAt: string
  updatedAt: string
}
