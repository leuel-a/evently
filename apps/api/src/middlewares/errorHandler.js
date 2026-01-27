import createError, {isHttpError} from 'http-errors';

/**
 * Express global error handler.
 *
 * @type {import('express').ErrorRequestHandler}
 */
export function errorHandler(err, _req, res, _next) {
    let error = err;

    if (!isHttpError(error)) {
        error = createError(error);
    }

    const status = error.status || 500;
    const isProduction = process.env.NODE_ENV === 'production';

    res.status(status).json({
        status,
        message: error.message,
        ...(error.details && {details: error.details}),
        ...(isProduction ? {} : {stack: error.stack}),
    });
}
