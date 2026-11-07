import { body } from 'express-validator'

const chapaFields = {
    amount: {
        name: 'amount',
        isNumeric: {
            message: 'Amount must be a number'
        },
    },
    phoneNumber: {
        name: 'phone_number',
        isString: {
            message: 'Phone Number must be a string',
        },
        notEmpty: {
            message: 'Phone Number can\'t be empty'
        }
    }
};

const chapaFieldsValidator = {
    amount: body(chapaFields.amount.name)
        .isNumeric()
        .withMessage(chapaFields.amount.isNumeric.message),
    phoneNumber: body(chapaFields.phoneNumber.name)
        .isString()
        .withMessage(chapaFields.phoneNumber.isString.message)
        .bail()
        .notEmpty()
        .withMessage(chapaFields.phoneNumber.notEmpty.message)
};

export const initalizeAcceptPaymentChapaValidator = [
    chapaFieldsValidator.amount,
    chapaFieldsValidator.phoneNumber
]
