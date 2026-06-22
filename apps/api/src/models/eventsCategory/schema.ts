import mongoose from 'mongoose';
import {
    CreateEventCategoryPayload,
    DeleteEventCategoryResult,
    GetEventCategoriesParams,
    GetEventCategoriesResult,
    GetEventCategoryParams,
    GetEventCategoryResult,
    GetSettingsForDashboardParams,
    GetSettingsForDashboardResult,
    UpdateEventCategoryResult,
} from './statics';
import {modelNames} from '../../config';

export interface IEventCategory {
    name: string;
    description: string;
    isDeleted: boolean;
    user: mongoose.Schema.Types.ObjectId;
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

    getSettingsForDashboard(
        this: IEventCategoryModel,
        params: GetSettingsForDashboardParams,
    ): Promise<GetSettingsForDashboardResult>;
}

const schema = new mongoose.Schema<IEventCategory>(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        isDeleted: {type: Boolean, required: false, default: false},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
    },
    {timestamps: true},
);

// INFO: read more about indexes
// Checkout this link: https://www.mongodb.com/docs/manual/indexes/
schema.index({name: 'text', description: 'text'});

export default schema;
