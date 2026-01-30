import {body, query, param} from 'express-validator';
import {EVENT_STATUS, EVENT_TYPE} from '../models/events/schema.js';
import {optionalize} from './utils.js';

const INVALID_EVENT_ID = 'Event ID is not a valid Mongo ID';

const fields = {
    title: {
        name: 'title',
        isString: {
            message: 'Title must be a string',
        },
        notEmpty: {
            message: "Title can't be empty string",
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
    date: {
        name: 'date',
        isISO8601: {
            message: 'Date must be a valid ISO 8601 date string',
        },
    },
    location: {
        name: 'location',
        isString: {
            message: 'Location must be a string',
        },
    },
    ticketPrice: {
        name: 'ticketPrice',
        isNumeric: {
            message: 'Tickeet price must be a number',
        },
    },
    capacity: {
        name: 'capacity',
        isNumeric: {
            message: 'Capacity must be a number',
        },
    },
    checkoutLink: {
        name: 'checkoutLink',
        isURL: {
            message: 'Checkout link must be a valid URL',
        },
    },
    status: {
        name: 'status',
        isIn: {
            message: `Status must be one of: ${Object.values(EVENT_STATUS).join(', ')}`,
        },
    },
    type: {
        name: 'status',
        isIn: {
            message: `Type must be one of: ${Object.values(EVENT_TYPE).join(', ')}`,
        },
    },
    virtualUrl: {
        name: 'virtualUrl',
        isURL: {
            message: 'Virtual URL must be a valid URL',
        },
    },
    isVirtual: {
        name: 'isVirtual',
        isBoolean: {
            message: 'isVirtual must be a boolean value',
        },
    },
    isFree: {
        name: 'isFree',
        isBoolean: {
            message: 'isFree must be a boolean value',
        },
    },
    address: {
        name: 'address',
        isString: {
            message: 'address must be a string',
        },
    },
    startTime: {
        name: 'startTime',
        isString: {
            message: 'startTime must be a string',
        },
    },
    endTime: {
        name: 'endTime',
        isString: {
            message: 'endTime must be a string',
        },
    },
    category: {
        name: 'category',
        isMongoId: {
            message: 'category must be a valid Mongo Id',
        },
    },
};

const eventFieldsValidators = {
    title: body(fields.title.name)
        .isString()
        .withMessage(fields.title.isString.message)
        .notEmpty()
        .withMessage(fields.title.notEmpty.message),
    description: body(fields.description.name)
        .isString()
        .withMessage(fields.description.isString.message)
        .bail()
        .notEmpty()
        .withMessage(fields.description.notEmpty.message),
    date: body(fields.date.name).isISO8601().withMessage(fields.date.isISO8601.message).toDate(),
    location: body(fields.location.name).isString().withMessage(fields.location.isString.message),
    ticketPrice: body(fields.ticketPrice.name)
        .isNumeric()
        .withMessage(fields.ticketPrice.isNumeric.message),
    capacity: body(fields.capacity.name).isNumeric().withMessage(fields.capacity.isNumeric.message),
    checkoutLink: body(fields.checkoutLink.name)
        .isURL()
        .withMessage(fields.checkoutLink.isURL.message),
    status: body(fields.status.name)
        .isIn(Object.values(EVENT_STATUS))
        .withMessage(fields.status.isIn.message),
    type: body(fields.type.name)
        .isIn(Object.values(EVENT_TYPE))
        .withMessage(fields.type.isIn.message),
    virtualUrl: body(fields.virtualUrl.name).isURL().withMessage(fields.virtualUrl.isURL.message),
    isVirtual: body(fields.isVirtual.name)
        .isBoolean()
        .withMessage(fields.isVirtual.isBoolean.message)
        .optional(),
    isFree: body(fields.isFree.name)
        .isBoolean()
        .withMessage(fields.isFree.isBoolean.message)
        .optional(),
    address: body(fields.address.name)
        .isString()
        .withMessage(fields.address.isString.message)
        .optional(),
    startTime: body(fields.startTime.name)
        .isString()
        .withMessage(fields.startTime.isString.message),
    endTime: body(fields.endTime.name).isString().withMessage(fields.endTime.isString.message),
    category: body(fields.category.name).isMongoId().withMessage(fields.category.isMongoId.message),
};

export const createEventValidator = [
    eventFieldsValidators.title,
    eventFieldsValidators.description,
    eventFieldsValidators.date,
    eventFieldsValidators.ticketPrice.optional(),
    eventFieldsValidators.capacity,
    eventFieldsValidators.location.optional(),
    eventFieldsValidators.checkoutLink.optional(),
    eventFieldsValidators.status.optional(),
    eventFieldsValidators.type.optional(),
    eventFieldsValidators.virtualUrl.optional(),
    eventFieldsValidators.startTime,
    eventFieldsValidators.endTime,
    eventFieldsValidators.category,
];

export const getEventsValidator = [
    query('q').isString().optional(),
    query('limit').isNumeric().optional(),
    query('limit').default(10),
    query('page').isNumeric().optional(),
    query('page').default(1),
];

export const getEventValidator = [param('id').isMongoId().withMessage(INVALID_EVENT_ID)];

export const updateEventValidator = [
    param('id').isMongoId().withMessage(INVALID_EVENT_ID),
    ...Object.values(eventFieldsValidators).map(optionalize),
    body().custom((_, {request}) => {
        if (request?.body && Object.keys(request?.body).length === 0) {
            throw new Error('At least one field must be provided');
        }
        return true;
    }),
];

export const deleteEventValidator = [param('id').isMongoId().withMessage(INVALID_EVENT_ID)];
