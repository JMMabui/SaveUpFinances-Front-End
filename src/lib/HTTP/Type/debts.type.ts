enum DebtStatus {
    PENDING = "pending",
    PAID = "paid",
}

export interface debtsResponse  {
    id: string;
    userId: string;
    createdAt: Date;
    description: string;
    amount: number;
    notes: string | null;
    status: DebtStatus;
    creditor: string;
    dueDate: Date;
    paymentDate: Date | null;
}

export interface debtsRequest {
    description: string;
    amount: number;
    creditor: string;
    dueDate: string;
    status: DebtStatus;
    userId: string;
    notes?: string | null | undefined;
    paymentDate?: string | null | undefined;
}