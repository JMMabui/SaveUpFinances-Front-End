export interface incomeSourceResponse {
    name: string;
    frequency: string;
    startDate: Date;
    endDate: Date | null;
    id: string;
    isActive: boolean;
    userId: string;
    createdAt: Date;
}

export interface incomeSourceRequest {
    name: string;
    frequency: string;
    startDate: Date;
    endDate: Date | null;
    userId: string;
}
