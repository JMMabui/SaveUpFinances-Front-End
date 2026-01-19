export interface creditCardResponse {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date
  name: string
  limit: number
  dueDay: number
}

export interface creditCardRequest {
  userId: string
  name: string
  limit: number
  dueDay: number
}
