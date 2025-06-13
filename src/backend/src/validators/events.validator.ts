import dayjs from 'dayjs';
import { body } from 'express-validator';
import { isValidISODate } from '@/utils/date';
import { validateMongoIdParam } from '@/validators/utils';

const validateEventFields = ({ isUpdate = true }) => {
  const validators = [
    body('title').trim().notEmpty().withMessage('Event Title is required'),
    body('description')
      .trim()
      .isLength({ min: 20, max: 500 })
      .withMessage('Event Description must be a string of length between 20, and 500'),
    body('startDate')
      .custom(isValidISODate)
      .withMessage('Event Start Date must be a valid ISO date'),
    body('endDate')
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
      }),
    body('location'),
    body('isRemote'),
    body('capacity').isInt({ min: 0 }).withMessage('Event Capacity must be a positive number'),
  ];

  // Make fields optional for update
  if (isUpdate) {
    validators.forEach((validator) => validator.optional());
  }

  return validators;
};

export const createEventValidator = [...validateEventFields({ isUpdate: false })];

export const getEventValidator = [validateMongoIdParam('id', 'Event ID')];

export const updateEventValidator = [
  validateMongoIdParam('id', 'Event ID'),
  ...validateEventFields({ isUpdate: true }),
  body(['createdBy', 'createdAt', 'updatedAt'])
    .not()
    .exists()
    .withMessage('Cannot update protected fields: createdBy, createdAt, and updatedAt'),
];
