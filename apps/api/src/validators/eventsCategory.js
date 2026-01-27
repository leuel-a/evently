import {body, query, param} from 'express-validator';
import {optionalize} from './utils.js';

const INVALID_EVENT_CATEGORY_ID_MESSAGE = 'Event Category ID is not valid';

const fields = {
    name: {
        name: 'name',
        isString: {
            message: 'Name must be a string',
        },
        notEmpty: {
            message: "Name can't be an empty string",
        },
    },
    description: {
        name: 'description',
        isString: {
            message: 'Description must be a string',
        },
        notEmpty: {
            message: "Description can't be an empty string",
        },
    },
};

const eventsCategoryFieldsValidators = {
    name: body(fields.name.name)
        .isString()
        .withMessage(fields.name.isString.message)
        .notEmpty()
        .withMessage(fields.name.notEmpty.message),
    description: body(fields.description.name)
        .isString()
        .withMessage(fields.description.isString.message)
        .notEmpty()
        .withMessage(fields.description.notEmpty.message),
};

export const createEventCategoryValidator = [
    eventsCategoryFieldsValidators.name,
    eventsCategoryFieldsValidators.description,
];

export const getEventCategoriesValidator = [
    query('q').isString().optional(),
    query('limit').isNumeric().optional(),
    query('limit').default(10),
    query('page').isNumeric().optional(),
    query('page').default(1),
];

export const getEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
];

export const updateEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
    ...Object.values(eventsCategoryFieldsValidators).map(optionalize),
    body().custom((_, {request}) => {
        if (request?.body && Object.keys(request?.body).length === 0) {
            throw new Error('At least one field must be provided');
        }
        return true;
    }),
];

export const deleteEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
];
