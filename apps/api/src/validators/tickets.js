import {query} from 'express-validator';
import {TICKET_STATUS} from '../models/tickets/schema.js';

export const getTicketsValidator = [
    query('limit').isNumeric().optional(),
    query('limit').default(10),
    query('page').isNumeric().optional(),
    query('page').default(1),
    query('status')
        .isString()
        .optional()
        .isIn(Object.values(TICKET_STATUS))
        .withMessage('Invalid Ticket Status'),
];
