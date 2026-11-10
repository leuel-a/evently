import axios from 'axios';
import {type ErrorRequestHandler} from 'express';
import createHttpError, {isHttpError} from 'http-errors';
import {type InitializeChapaAcceptPaymentResponse} from '../handlers/payments';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let error = err;

    if (!isHttpError(error)) {
        if (axios.isAxiosError<InitializeChapaAcceptPaymentResponse>(error)) {
            const upstreamStatus = error.response?.status;
            const upstreamMessage =
                error.response?.data?.message ?? error.message;

            error = createHttpError(upstreamStatus ?? 502, upstreamMessage, {
                cause: error,
            });
        } else {
            error = createHttpError(500, error.message, {cause: error});
        }
    }

    const status = (error as {status?: number}).status ?? 500;
    const isProduction = process.env.NODE_ENV === 'production';

    res.status(status).json({
        status,
        message: error.message,
        ...('details' in error && error.details
            ? {details: error.details}
            : {}),
        ...(isProduction ? {} : {stack: error.stack}),
    });
};
