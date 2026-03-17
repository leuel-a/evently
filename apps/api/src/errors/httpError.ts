import createError, {type HttpError} from 'http-errors';

export function httpError(status: number, message: string, details: any): HttpError {
    const error = createError(status, message);

    if (details) {
        error.details = details;
    }

    return error;
}
