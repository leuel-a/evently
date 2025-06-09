import { ErrorRequestHandler } from 'express';
import { HttpError, isHttpError } from 'http-errors';
import { logger } from '@/utils/logger';
import { ValidationError } from '@/models/ValidationError';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (isHttpError(error)) {
    res.status((error as HttpError).status).json({
      message: (error as HttpError).message,
    });
  } else if (error instanceof ValidationError) {
    res.status(400).json({
      message: error.message,
      errors: error.errors,
    });
  } else {
    logger.error('Unhandled error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
