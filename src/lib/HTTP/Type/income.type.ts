export interface incomeResponse {
    id: string;
    userId: string;
    createdAt: Date;
    date: Date;
    description: string;
    amount: number;
    sourceId: string;
}

export interface incomeRequest{
    userId: string;
    date: Date;
    description: string;
    amount: number;
    sourceId: string;
}