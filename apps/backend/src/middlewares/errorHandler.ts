import createHttpError from 'http-errors';
import { ErrorRequestHandler } from 'express';
import { logger } from '@/utils/logger';
import { ValidationError } from '@/models/ValidationError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
    const httpError = err as createHttpError.HttpError;

    res.status(httpError.status).json({
      message: httpError.message,
    });
  } else if (err instanceof ValidationError) {
    // TODO: only log validation errors in development mode
    // TODO: might need to add a logger for validation errors
    logger.error('Validation Error:', err);

    res.status(400).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    logger.error('Unhandled error:', err);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
