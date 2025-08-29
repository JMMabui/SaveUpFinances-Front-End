export interface debtPaymentsResponse {
    id: string;
    createdAt: Date;
    date: Date;
    amount: number;
    accountId: string | null;
    notes: string | null;
    debtId: string;
}

export interface debtPaymentsRequest{
    amount: number;
    date: string;
    debtId: string;
    accountId?: string | null | undefined;
    notes?: string | null | undefined;
}
