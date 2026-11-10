import mongoose from 'mongoose';
import type {
    CreateEventPayload,
    GetEventParams,
    GetEventResult,
    GetEventsParams,
    GetEventsResult,
    GetEventStatsParams,
    GetEventStatsResult,
    GetSettingsForDashboardParams,
    GetSettingsForDashboardResult,
} from './statics';

export interface IEvent {
    title: string;
    description: string;
    date: Date;
    location: string;
    ticketPrice: number;
    capacity: number;
    checkoutLink: string;
    status: string;
    country: string;
    type: string;
    category: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    isDeleted: Boolean;
    virtualUrl: string;
    address: string;
    startTime: string;
    endTime: string;
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

    createEvent(
        this: IEventModel,
        payload: CreateEventPayload,
    ): Promise<EventDocument>;

    getEvents(
        this: IEventModel,
        params: GetEventsParams,
    ): Promise<GetEventsResult>;

    updateEvent(
        this: IEventModel,
        objectId: mongoose.Types.ObjectId,
        updatedData: Partial<IEvent>,
        options?: mongoose.QueryOptions,
    ): Promise<IEvent>;

    deleteEvent(
        this: IEventModel,
        objectId: mongoose.Types.ObjectId,
    ): Promise<EventDocument>;

    getSettingsForDashboard(
        this: IEventModel,
        params: GetSettingsForDashboardParams,
    ): Promise<GetSettingsForDashboardResult>;

    getEventStats(
        this: IEventModel,
        params: GetEventStatsParams,
    ): Promise<GetEventStatsResult>;
}
