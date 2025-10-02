export interface budgetResponse {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    month: number;
    year: number;
    categoryId: string;
    limit: number;
}

export interface budgetRequest {
    userId: string;
    month: number;
    year: number;
    categoryId: string;
    limit: number;
}

export interface budgetUpdateRequest {
    id?: string;
    userId?: string
    month?: number;
    year?: number;
    categoryId?: string;
    limit?: number;
    updatedAt?: Date;
}
