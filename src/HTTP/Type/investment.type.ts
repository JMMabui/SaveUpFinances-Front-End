export interface investmentResponse {
    id: string;
    userId: string;
    createdAt: Date;
    investimentName: string;
    amount: number;
    investmentTypeId: string;
    investmentGoalId: string | null;
    notes: string | null;
    updatedAt: Date;
}

export interface investmentRequest {
    userId: string;
    investimentName: string;
    amount: number;
    investmentTypeId: string;
    investmentGoalId: string | null;
    notes: string | null;
}
