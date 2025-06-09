import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '@/models/ValidationError';

export const validateRequest: RequestHandler = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ValidationError('Validation error has occured', errors.array()));
  }
  next();
};
