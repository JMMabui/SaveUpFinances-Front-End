import type { z } from 'zod'
import type { AccountsPostAccountsBodySchema } from '@/lib/openapi/zod/Accounts'
import type { accountBalanceResponse } from './account-balance.type'
import type { accountSourceResponse } from './account-source.type'
import type { bankResponde } from './banks.type'
import type { debtPaymentsResponse } from './debts-payments.type'
import type { TransactionResponse } from './transactions.type'

export enum AccountType {
  CURRENT = 'current',
  SAVINGS = 'savings',
  SALARY = 'salary',
  INVESTMENT = 'investment',
  DIGITAL = 'digital',
  JOINT = 'joint',
}

export enum Currency {
  MZN = 'MZN',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  BRL = 'BRL',
  JPY = 'JPY',
  CNY = 'CNY',
  INR = 'INR',
  RUB = 'RUB',
  AUD = 'AUD',
  CAD = 'CAD',
}

export interface account {
  accountType: AccountType
  accountName: string
  accountHolderName: string
  id: string
  balance: number
  userId: string
  bankId: string | null
  currency: Currency
  isActive: boolean
  isDefault: boolean
  isJoint: boolean
  createdAt: Date
  updatedAt: Date
}

export interface accountsResponse {
  accounts: {
    bank: bankResponde[]
    AccountBalance: accountBalanceResponse[]
    AccountSource: accountSourceResponse[]
    transactions: TransactionResponse[]
    DebtPayment: debtPaymentsResponse[]
  } & account[]
  totalAmount: number
}

export interface accountResponse {
  accountType: AccountType
  accountName: string
  accountHolderName: string
  id: string
  balance: number
  userId: string
  bankId: string | null
  currency: Currency
  isActive: boolean
  isDefault: boolean
  isJoint: boolean
  createdAt: Date
  updatedAt: Date
}

export type accountRequest = z.infer<typeof AccountsPostAccountsBodySchema>
