import dayjs from 'dayjs';
import { body, param } from 'express-validator';
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
    .withMessage('Event End Date must be a valid ISO string')
    .bail()
    .custom((_value, { req }) => {
      const startDate = dayjs(req.body.startDate);
      const endDate = dayjs(req.body.endDate);
      if (startDate >= endDate) {
        throw new Error('Event Start Date must be before End Date');
      }
      return true;
    })
    .withMessage('Event Start Date must be before End Date'),
  body('capacity').notEmpty().withMessage('Event Capacity is required'),
];

export const getEventValidator = [
  param('id')
    .notEmpty()
    .withMessage('Event ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid Event ID'),
];
