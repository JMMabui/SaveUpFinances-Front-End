import { accountBalanceResponse } from "./account-balance.type";
import { accountSourceResponse } from "./account-source.type";
import { bankResponde } from "./banks.type";
import { debtPaymentsResponse } from "./debts-payments.type";
import { TransactionResponse } from "./transactions.type";

enum AccountType {
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
    accountType: AccountType;
    accountName: string;
    accountHolderName: string;
    id: string;
    balance: number;
    userId: string;
    bankId: string | null;
    currency: Currency;
    isActive: boolean;
    isDefault: boolean;
    isJoint: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface accountsResponse {
   accounts: ({
    bank: bankResponde[] ,
    AccountBalance: accountBalanceResponse [],
    AccountSource: accountSourceResponse[],
    transactions: TransactionResponse[],
    DebtPayment: debtPaymentsResponse[],  
   }& account[]);
   totalAmount: number;
}

export interface accountResponse {
    accountType: AccountType;
    accountName: string;
    accountHolderName: string;
    id: string;
    balance: number;
    userId: string;
    bankId: string | null;
    currency: Currency;
    isActive: boolean;
    isDefault: boolean;
    isJoint: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface accountRequest {
    id?: string,
    accountName: string;
    accountType: AccountType;
    accountHolderName: string;
    balance: number;
    userId: string;
    bankId: string | null;
    currency?: Currency;
    isActive?: boolean;
    isDefault?: boolean;
    isJoint?: boolean;
}

