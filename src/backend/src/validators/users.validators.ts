import { body, param } from 'express-validator';

export const createUserValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is required, Please provide an email address.')
    .bail()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .bail()
    .withMessage('Confirm Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Passwords don't match."),
  body('firstName').notEmpty().withMessage('Firstname is required'),
  body('lastName').notEmpty().withMessage('Lastname is required'),
];

export const getUserValidator = [
  param('id')
    .notEmpty()
    .withMessage('User ID is required')
    .bail()
    .isMongoId()
    .withMessage('Invalid User ID'),
];
