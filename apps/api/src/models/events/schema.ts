import mongoose from 'mongoose';
import {modelNames} from '../../config';

export const EVENT_STATUS = Object.freeze({
    DRAFT: 'draft',
    ACTIVE: 'active',
    CLOSED: 'closed',
});

export const EVENT_TYPE = Object.freeze({
    PHYSICAL: 'physical',
    VIRTUAL: 'virtual',
    HYBRID: 'hybrid',
});

export interface IEvent {
    title: String;
    description: String;
    date: Date;
    location: String;
    ticketPrice: Number;
    capacity: Number;
    checkoutLink: String;
    status: String;
    type: String;
    category: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    isDeleted: Boolean;
    virtualUrl: String;
    address: String;
    startTime: String;
    endTime: String;
}

export type EventDocument = IEvent &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

const schema = new mongoose.Schema<IEvent>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        date: {type: Date, required: true},
        location: {type: String},
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

schema.virtual('isVirtual').get(function () {
    return this.type === EVENT_TYPE.VIRTUAL;
});

schema.virtual('isFree').get(function () {
    return this.ticketPrice === 0;
});

export default schema;
