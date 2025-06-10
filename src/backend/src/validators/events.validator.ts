import { body } from 'express-validator';
import { isValidISODate } from '@/utils/date';

export const createEventValidator = [
  body('title').notEmpty().withMessage('Event Title is required').trim(),
  body('description')
    .notEmpty()
    .withMessage('Event Description is required')
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage('Event Description must be a string of length between 20, and 500'),
  body('startDate')
    .notEmpty()
    .withMessage('Event Start Date is required')
    .bail()
    .custom(isValidISODate)
    .withMessage('Event Start Date must be a valid ISO date'),
  body('endDate')
    .notEmpty()
    .withMessage('Event End Date is required')
    .bail()
    .custom(isValidISODate)
    .withMessage('Event End Date must be a valid ISO string'),
  body('capacity').notEmpty().withMessage('Event Capacity is required'),
];
