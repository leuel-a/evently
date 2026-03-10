export type AppErrorOptions = {
    message: string;
    statusCode?: number;
    status: number;
    statusText: string;
    url: string;
    data?: unknown;
};

export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly statusText: string;
    public readonly url: string;
    public readonly data?: unknown;

    constructor({message, status, statusText, url, data}: AppErrorOptions) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = status;
        this.statusText = statusText;
        this.url = url;
        this.data = data;
    }
}
