import httpStatus from 'http-status';
import {type RequestHandler} from 'express';
import {validationResult} from 'express-validator';
import {ERROR_LOG_TYPES} from '../utils/constants';
import winstonLogger from '../config/winston';

/** Middleware to run validation and handle errors before controllers. */
export const validateRequest: RequestHandler = async (req, res, next) => {
    const result = validationResult(req);
    const validationErrors = result.array();

    if (result.isEmpty()) {
        return next();
    }

    winstonLogger.error({
        message: 'Input Validation Error',
        status: httpStatus.BAD_REQUEST,
        requestUrl: req?.originalUrl,
        requestParams: req?.params,
        requestQuery: req?.query,
        requestBody: req?.body,
        validationErrors,
        errorType: ERROR_LOG_TYPES.VALIDATION,
    });

    return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        errors: result.array(),
    });
};
