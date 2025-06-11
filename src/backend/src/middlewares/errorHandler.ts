import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';
import type { HttpError } from 'http-errors';
import { ValidationError } from '@/models/ValidationError';
import { logger } from '@/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (isHttpError(error)) {
    res.status((error as HttpError).status).json({
      responseEnum: (error as HttpError).message,
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
