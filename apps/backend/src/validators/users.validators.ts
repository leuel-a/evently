import { body } from 'express-validator';

export const createUserValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required, Please provide an email address')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    }),
];
