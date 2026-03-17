import createError from 'http-errors';

export const errors = {
    badRequest: (message: string) => createError.BadRequest(message),
    unauthorized: (message: string) => createError.Unauthorized(message),
    forbidden: (message: string) => createError.Forbidden(message),
    notFound: (message: string) => createError.NotFound(message),
    conflict: (message: string) => createError.Conflict(message),
};

export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Unauthorized',
};
