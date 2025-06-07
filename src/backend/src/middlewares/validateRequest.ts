import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '@/models/ValidationError';

export const validateRequest: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ValidationError('ValidationError', errors.array());
  }
  next();
};
