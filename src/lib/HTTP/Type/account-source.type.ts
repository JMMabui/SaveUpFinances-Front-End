export interface accountSourceResponse {
  id: string
  accountId: string
  source: string
  createdAt: string
  updatedAt: string
}

export interface accountSourceRequest {
  accountId: string
  source: string
}
