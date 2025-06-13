import dayjs from 'dayjs';
import { param } from 'express-validator';

export const ISO_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ'

export const isValidISODate = (value: string) => {
  return dayjs(value).isValid();
};

export const validateMongoIdParam = (paramName: string, label: string) =>
  param(paramName)
    .notEmpty()
    .withMessage(`${label} is required`)
    .bail()
    .isMongoId()
    .withMessage(`Invalid ${label}`);
