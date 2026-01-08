export interface expensesResponse {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    description: string;
    amount: number;
    categoryId: string;
}

export interface expensesRequest {
    userId: string;
    date: Date;
    description: string;
    amount: number;
    categoryId: string;
}
