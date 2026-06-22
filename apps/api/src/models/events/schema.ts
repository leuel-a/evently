import mongoose from 'mongoose';
import {modelNames} from '../../config';
import type {
    CreateEventPayload,
    GetEventParams,
    GetEventResult,
    GetEventsParams,
    GetEventsResult,
    GetEventStatsParams,
    GetEventStatsResult,
    GetSettingEventCategoriesResult,
    GetSettingsForDashboardParams,
    GetSettingsForDashboardResult,
} from './statics';

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
    country: String;
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

export interface IEventModel extends mongoose.Model<EventDocument> {
    getEvent(
        this: IEventModel,
        params: GetEventParams,
        opts?: mongoose.QueryOptions,
    ): Promise<GetEventResult>;

    createEvent(this: IEventModel, payload: CreateEventPayload): Promise<EventDocument>;

    getEvents(this: IEventModel, params: GetEventsParams): Promise<GetEventsResult>;

    updateEvent(
        this: IEventModel,
        objectId: mongoose.Types.ObjectId,
        updatedData: Partial<IEvent>,
        options?: mongoose.QueryOptions,
    ): Promise<IEvent>;

    deleteEvent(this: IEventModel, objectId: mongoose.Types.ObjectId): Promise<EventDocument>;

    getSettingsForDashboard(
        this: IEventModel,
        params: GetSettingsForDashboardParams,
    ): Promise<GetSettingsForDashboardResult>;

    getEventStats(this: IEventModel, params: GetEventStatsParams): Promise<GetEventStatsResult>;
}

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
