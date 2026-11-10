import mongoose from 'mongoose';
import {modelNames} from '../config';
import type {IEvent} from './types';
import {EVENT_STATUS, EVENT_TYPE} from './constants';

const schema = new mongoose.Schema<IEvent>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        date: {type: Date, required: true},
        location: {type: String, required: false},
        country: {type: String, required: true},
        ticketPrice: {type: Number, required: false, default: 0},
        capacity: {type: Number, required: true},
        checkoutLink: {type: String, required: false},
        status: {
            type: String,
            enum: Object.values(EVENT_STATUS),
            default: EVENT_STATUS.DRAFT,
        },
        type: {
            type: String,
            enum: Object.values(EVENT_TYPE),
            default: EVENT_TYPE.PHYSICAL,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.eventsCategory,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
        isDeleted: {type: Boolean, default: false},
        virtualUrl: {type: String, required: false},
        address: {type: String, required: false},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
    },
    {timestamps: true},
);

// INFO: read more about indexes
// Checkout this link: https://www.mongodb.com/docs/manual/indexes/
schema.index({title: 'text', description: 'text'});

schema.virtual('isVirtual').get(function () {
    return this.type === EVENT_TYPE.VIRTUAL;
});

schema.virtual('isFree').get(function () {
    return this.ticketPrice === 0;
});

export default schema;
