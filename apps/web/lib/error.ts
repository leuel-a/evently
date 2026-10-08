export type AppErrorOptions = {
    message: string;
    statusCode?: number;
    status: number;
    statusText: string;
    data?: unknown;
};

export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly statusText: string;
    public readonly data?: unknown;

    constructor({message, status, statusText, data}: AppErrorOptions) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = status;
        this.statusText = statusText;
        this.data = data;
    }
}
