import httpStatus from 'http-status';
import {validationResult} from 'express-validator';
import {ERROR_LOG_TYPES} from '../utils/constants.js';
import winstonLogger from '../config/winston.js';

/**
 * Middleware to run validation and handle errors before controllers.
 * @type {import('express').RequestHandler}
 */
export function validateRequest(req, res, next) {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        return next();
    }

    winstonLogger.error({
        message: 'Input Validation Error',
        status: httpStatus.BAD_REQUEST,
        requestUrl: req?.originalUrl,
        requestParams: req?.params,
        requestQuery: req?.query,
        requestBody: req?.body,
        validationErrors: validationErrors.errors,
        errorType: ERROR_LOG_TYPES.VALIDATION,
    });

    return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors: validationErrors.array(),
    });
}
