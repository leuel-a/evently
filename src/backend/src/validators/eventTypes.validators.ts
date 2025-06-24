import {body, param} from 'express-validator';

export const createEventTypeValidator = [body('name').notEmpty().withMessage('Name is required')];

export const getEventTypeValidator = [param('id').isMongoId().withMessage('Invalid event type id')];
