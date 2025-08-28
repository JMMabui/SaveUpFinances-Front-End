
enum AccountType {
    CURRENT = 'current',
    SAVINGS = 'savings',
    SALARY = 'salary',
    INVESTMENT = 'investment',
    DIGITAL = 'digital',
    JOINT = 'joint',
}

enum Currency {
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

interface account {
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
}

export interface accountResponse {
   accounts: account[];
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


