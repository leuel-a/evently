import {ERROR_CODES, type ErrorCode} from './error-codes';

export type AppErrorOptions = {
    message: string;
    statusCode?: number;
    code?: ErrorCode;
};

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;

    constructor({message, statusCode = 500, code = ERROR_CODES.INTERNAL_ERROR}: AppErrorOptions) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
    }
}
