
export interface accountBalanceRequest {
    accountId: string
    date: Date
    balance: number
}

export interface accountBalanceResponse {
    id: string;
    accountId: string;
    date: Date;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}
