

export interface accountSourceResponse {
    id: string;
    accountId: string;
    source: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface accountSourceRequest {
    accountId: string;
    source: string;
}
