import mongoose, {QueryOptions} from 'mongoose';
import EventsCategoryModel from './index';
import {getPaginationValues} from '../helpers/index';
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

export type CreateEventCategoryResult = Omit<IEventCategory, '_id' | 'isDeleted'> & {id: string};
export type CreateEventCategoryPayload = Omit<IEventCategory, 'isDeleted'>;
export async function createEventCategory(
    this: IEventCategoryModel,
    payload: CreateEventCategoryPayload,
): Promise<CreateEventCategoryResult> {
    const result = await this.create(payload);
    const {_id, ...rest} = result.toObject() as EventCategoryDocument;
    return {id: _id.toString(), ...rest};
}

export type GetEventCategoriesResult = {
    data: IEventCategory[];
    page: string;
    limit: number;
    total: number;
};
export type GetEventCategoriesParams = {
    page: string;
    size: string;
    userId: string;
    ids?: string[];
    q?: string;
};
export async function getEventCategories(
    this: typeof EventsCategoryModel,
    params: GetEventCategoriesParams,
): Promise<GetEventCategoriesResult> {
    const {page, size, userId, ids, q} = params;
    const matchQuery = {
        isDeleted: false,
        user: new mongoose.Types.ObjectId(userId),
        ...(ids && {ids: {$in: [...ids]}}),
        // INFO: since there is a $text, the $match pipline stage should
        // the first stage in the aggregation pipeline
        // Checkout --> https://www.mongodb.com/docs/upcoming/tutorial/text-search-in-aggregation/
        ...(q && {$text: {$search: q, $caseSensitive: false, $diacriticSensitive: false}})
    };

    const {limit, skip} = getPaginationValues(page, size);
    const results = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $facet: {
                data: [
                    {$skip: skip},
                    {$limit: limit},
                    {
                        $project: {
                            id: '$_id',
                            _id: 0,
                            name: 1,
                            description: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                ],
                total: [{$count: 'count'}],
            },
        },
    ]);

    const resultData = results?.[0]?.data;
    const resultTotal = results?.[0]?.total;
    return {data: resultData, total: resultTotal?.[0]?.count, page, limit};
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

export type GetSettingsForDashboardParams = {userId: string};
export type GetSettingsForDashboardResult = {categories: Array<{name: string; id: string}>};
export async function getSettingsForDashboard(
    this: typeof EventsCategoryModel,
    params: GetSettingsForDashboardParams,
) {
    const {userId} = params;
    const matchQuery = {user: new mongoose.Types.ObjectId(userId)};

    const categories = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $project: {
                _id: 0,
                id: '$_id',
                name: 1,
            },
        },
    ]);

    const resultData = {categories};
    return resultData;
}
