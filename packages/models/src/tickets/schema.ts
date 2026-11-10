import mongoose from 'mongoose';
import {modelNames} from '../config';
import type {ITicket} from './types';
import {TICKET_STATUS} from './constants';

const schema = new mongoose.Schema<ITicket>(
    {
        event: {
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
            default: TICKET_STATUS.PENDING,
        },
    },
    {timestamps: true},
);

export default schema;
