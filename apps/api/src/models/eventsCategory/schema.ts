import mongoose from 'mongoose';
import {
    CreateEventCategoryPayload,
    DeleteEventCategoryResult,
    GetEventCategoriesParams,
    GetEventCategoriesResult,
    GetEventCategoryParams,
    GetEventCategoryResult,
    UpdateEventCategoryResult,
} from './statics';

export interface IEventCategory {
    name: string;
    description: string;
    isDeleted: boolean;
}

export type EventCategoryDocument = IEventCategory &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IEventCategoryModel extends mongoose.Model<EventCategoryDocument> {
    createEventCategory(
        this: IEventCategoryModel,
        payload: CreateEventCategoryPayload,
    ): Promise<EventCategoryDocument>;
    getEventCategory(
        this: IEventCategoryModel,
        params: GetEventCategoryParams,
        opts?: mongoose.QueryOptions,
    ): Promise<GetEventCategoryResult>;
    getEventCategories(
        this: IEventCategoryModel,
        params: GetEventCategoriesParams,
    ): Promise<GetEventCategoriesResult>;
    deleteEventCategory(
        this: IEventCategoryModel,
        objectId: string,
    ): Promise<DeleteEventCategoryResult | null>;
    updateEventCategory(
        this: IEventCategoryModel,
        objectId: string,
        updatedData: Partial<IEventCategory>,
        options?: mongoose.QueryOptions,
    ): Promise<UpdateEventCategoryResult | null>;
}

const schema = new mongoose.Schema<IEventCategory>(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        isDeleted: {type: Boolean, required: false, default: false},
    },
    {timestamps: true},
);

export default schema;
