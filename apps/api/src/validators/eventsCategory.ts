import { body, query, param } from 'express-validator';
import { optionalize } from './utils';

const HEX_COLOR_REGEX = /^#[0-9a-f]{6}$/i;
const INVALID_EVENT_CATEGORY_ID_MESSAGE = 'Event Category ID is not valid';

const fields = {
    name: {
        name: 'name',
        isString: { message: 'Name must be a string' },
        notEmpty: { message: "Name can't be an empty string" },
    },
    description: {
        name: 'description',
        isString: { message: 'Description must be a string' },
        notEmpty: { message: "Description can't be an empty string" },
    },
    color: {
        name: 'color',
        isString: { message: 'Color must be a HEX string' },
        notEmpty: { message: 'Color can\'t be an empty string' },
        isHex: { message: 'Color must be a valid HEX color, e.g. #6366f1' },
    }
};

const eventsCategoryFieldsValidators = {
    name: body(fields.name.name)
        .isString()
        .withMessage(fields.name.isString.message)
        .bail()
        .notEmpty()
        .withMessage(fields.name.notEmpty.message),
    description: body(fields.description.name)
        .isString()
        .withMessage(fields.description.isString.message)
        .bail()
        .notEmpty()
        .withMessage(fields.description.notEmpty.message),
    color: body(fields.color.name)
        .isString()
        .withMessage(fields.color.isString.message)
        .bail()
        .notEmpty()
        .withMessage(fields.color.notEmpty.message)
        .bail()
        .custom((value: string) => HEX_COLOR_REGEX.test(value))
        .withMessage(fields.color.isHex.message),
};

export const createEventCategoryValidator = [
    eventsCategoryFieldsValidators.name,
    eventsCategoryFieldsValidators.description,
    eventsCategoryFieldsValidators.color,
];

export const getEventCategoriesValidator = [
    query('q').isString().optional(),
    query('limit').isNumeric().optional(),
    query('limit').default(10),
    query('page').isNumeric().optional(),
    query('page').default(1),
    query('ids').isArray().optional(),
];

export const getEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
];

export const updateEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
    ...Object.values(eventsCategoryFieldsValidators).map(optionalize),
    body().custom((_, { req }) => {
        if (req?.body && Object.keys(req?.body).length === 0) {
            throw new Error('At least one field must be provided');
        }
        return true;
    }),
];

export const deleteEventCategoryValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_CATEGORY_ID_MESSAGE),
];
