import createError from 'http-errors';

export const errors = {
    badRequest: (message, d) => createError.BadRequest(message, {details: d}),
    unauthorized: (message) => createError.Unauthorized(message),
    forbidden: (message) => createError.Forbidden(message),
    notFound: (message) => createError.NotFound(message),
    conflict: (message) => createError.Conflict(message),
};
