// Tipos mínimos inferidos (ajuste quando o arquivo Type/transactions.type.ts for definido)
export interface TransactionResponse {
  id: string
  userId: string
  accountId: string
  date: string | Date
  description: string
  amount: number
  categoryId: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface TransactionRequest {
  userId: string
  accountId: string
  date: string | Date
  description: string
  amount: number
  categoryId: string
}
