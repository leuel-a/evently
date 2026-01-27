import mongoose from 'mongoose';
import {modelNames} from '../../config.js';

/** @enum {string} */
export const EVENT_STATUS = Object.freeze({
    DRAFT: 'draft',
    ACTIVE: 'active',
    CLOSED: 'closed',
});

/** @enum {string} */
export const EVENT_TYPE = Object.freeze({
    PHYSICAL: 'physical',
    VIRTUAL: 'virtual',
    HYBRID: 'hybrid',
});

/**
 * @typedef {import('../../utils/types.js').Event} Event
 * @type {import('mongoose').Schema<Event>}
 */
const schema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        date: {type: Date, required: true},
        location: {type: String},
        ticketPrice: {type: Number, required: true},
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
        isDeleted: {type: Boolean, default: false},
        virtualUrl: {type: String, required: false},
        isVirtual: {type: Boolean, default: false},
        isFree: {type: Boolean, default: false},
        address: {type: String, required: false},
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
    },
    {timestamps: true},
);

/** AUTO-DERIVED FIELDS */
schema.pre('save', function () {
    this.isVirtual = this.type === EVENT_TYPE.VIRTUAL;
    this.isFree = this.ticketPrice === 0;
});

export default schema;
