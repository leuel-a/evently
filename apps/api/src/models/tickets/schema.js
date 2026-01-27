import mongoose from 'mongoose';
import {modelNames} from '../../config.js';

/** @enum {string} */
export const TICKET_STATUS = Object.freeze({
    PAID: 'paid',
    REFUNDED: 'refunded',
    PEDNING: 'pending',
});

/**
 * @typedef {import(../../utils/types.js).Ticket Ticket}
 * @type {import('mongoose').Schema<Ticket>}
 */
const schema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.events,
            required: true,
        },
        purchaserName: {type: String, required: true},
        purchaserEmail: {type: String, required: true},
        paymentId: {type: String, required: true, unique: true},
        amountPaid: {type: Number, required: true},
        currency: {type: String, required: true},
        status: {
            type: String,
            enum: Object.keys(TICKET_STATUS),
            default: TICKET_STATUS.PEDNING,
        },
    },
    {timestamps: true},
);

export default schema;
