enum TransactionType {
    INCOME = "income",
    EXPENSE = "expense",
    INVESTMENT = "investment"
}

export interface categoryResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    categoryName: string;
    categoryType: TransactionType;
    icon: string | null;
    color: string | null;
}

export interface categoryRequest {
    categoryName: string;
    categoryType: TransactionType;
    icon: string | null;
    color: string | null;
}
