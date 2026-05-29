import mongoose, {QueryOptions} from 'mongoose';
import EventsCategoryModel from './index';
import {getPaginationValues} from '../helpers/index';
import {normalizeID} from '../helpers/aggregations';
import {getEventCategoryProjection} from './utils';
import {EventCategoryDocument, IEventCategory, IEventCategoryModel} from './schema';

export type GetEventCategoryResult = {data: IEventCategory};
export type GetEventCategoryParams = {id: string};
export async function getEventCategory(
    this: typeof EventsCategoryModel,
    params: GetEventCategoryParams,
    opts: QueryOptions = {lean: true},
) {
    const {id} = params;
    const matchQuery = {_id: id, isDeleted: false};

    const projection = getEventCategoryProjection();
    const options = {...opts};
    const eventCategory = await this.findOne(matchQuery, projection, options);

    return {data: eventCategory};
}

export type CreateEventCategoryResult = EventCategoryDocument;
export type CreateEventCategoryPayload = Omit<IEventCategory, 'isDeleted'>;
export async function createEventCategory(
    this: IEventCategoryModel,
    payload: CreateEventCategoryPayload,
): Promise<CreateEventCategoryPayload> {
    return this.create(payload);
}

export type GetEventCategoriesResult = {data: IEventCategory[]; page: string; limit: string};
export type GetEventCategoriesParams = {page: string; size: string};
export async function getEventCategories(
    this: typeof EventsCategoryModel,
    params: GetEventCategoriesParams,
): Promise<GetEventCategoriesResult> {
    const {page, size} = params;
    const matchQuery = {};
    const {limit, skip} = getPaginationValues(page, size);

    const eventsCategory = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
        ...normalizeID(),
    ]);

    return {data: eventsCategory, page, limit: size};
}

export type DeleteEventCategoryResult = IEventCategory;
export async function deleteEventCategory(
    this: typeof EventsCategoryModel,
    objectId: string,
): Promise<DeleteEventCategoryResult | null> {
    return this.findByIdAndUpdate(objectId, {isDeleted: true}, {new: true});
}

export type UpdateEventCategoryResult = IEventCategory;
export async function updateEventCategory(
    this: typeof EventsCategoryModel,
    objectId: string,
    updatedData: Partial<IEventCategory>,
    options: mongoose.QueryOptions = {new: true},
): Promise<UpdateEventCategoryResult | null> {
    return this.findByIdAndUpdate(objectId, {...updatedData}, options);
}
