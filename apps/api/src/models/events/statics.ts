import mongoose from 'mongoose';
import EventModel from '.';
import {getPaginationValues} from '../helpers/index';
import {getEventProjection} from './utils';
import {filtersQuery} from '../../utils/filters';
import {modelNames} from '../../config';
import {EVENT_TYPE, IEvent} from './schema';

export type GetEventParams = {id: string};
export type GetEventResult = {data: IEvent | null};

export type GetEventStatsParams = {userId: string};
export type GetEventStatsResult = {
    data: {
        totalEvents: number;
        totalCategories: number;
        categories: Array<{count: number; id: string; name: string}>;
    };
};
export async function getEventStats(this: typeof EventModel, params: GetEventStatsParams) {
    const {userId} = params;
    const matchQuery = {isDeleted: false, user: new mongoose.Types.ObjectId(userId)};

    const results = await this.aggregate([
        {
            $lookup: {
                from: mongoose.model(modelNames.eventsCategory).collection.name,
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $match: matchQuery,
        },
        // TODO: here there can be a better way to generate the total categories
        // search on the mongodb documentation
        {
            $facet: {
                categories: [
                    {
                        $group: {
                            _id: {
                                id: '$category._id',
                                name: '$category.name',
                            },
                            count: {$sum: 1},
                        },
                    },
                    {
                        $sort: {count: -1}, // INFO: this might need to be passed as a parameter
                    },
                    {
                        $project: {
                            id: '$_id.id',
                            _id: 0,
                            name: '$_id.name',
                            count: 1,
                        },
                    },
                ],
                totalEvents: [
                    {
                        $count: 'totalEvents',
                    },
                ],
            },
        },
    ]);

    const raw = results?.[0];
    const resultsData = {
        totalEvents: raw?.totalEvents?.[0]?.totalEvents ?? 0,
        totalCategories: (raw?.categories ?? []).length,
        categories: raw?.categories ?? [],
    };
    return {data: resultsData};
}

export async function getEvent(
    this: typeof EventModel,
    params: GetEventParams,
    opts: mongoose.QueryOptions = {},
): Promise<GetEventResult> {
    const {id: _id} = params;
    const matchQuery = {_id};

    const projection = getEventProjection();
    const options = {...opts};

    const event = await this.findOne(matchQuery, projection, options);
    if (event == null) {
        return {
            data: null,
        };
    }

    await event.populate([{path: 'category', select: 'name description'}]);

    return {
        data: {
            ...event.toObject({versionKey: false}),
        },
    };
}

export type CreateEventPayload = Omit<IEvent, 'isDeleted'>;
export async function createEvent(this: typeof EventModel, payload: CreateEventPayload) {
    const event = await this.create(payload);
    return event;
}

export type GetEventsParams = {page: string; size: string; userId: string; filters?: any};
export type GetEventsResult = {data: IEvent[]; total: number; page: string; limit: number};
export async function getEvents(this: typeof EventModel, params: GetEventsParams) {
    const {page, size, userId, filters = undefined} = params;
    const matchQuery = {
        isDeleted: false,
        user: new mongoose.Types.ObjectId(userId),
        ...filtersQuery(filters),
    };

    const {limit, skip} = getPaginationValues(page, size);
    const results = await this.aggregate([
        {
            $lookup: {
                from: mongoose.model(modelNames.eventsCategory).collection.name,
                localField: 'category',
                foreignField: '_id',
                as: 'category',
            },
        },
        {
            $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $addFields: {
                isVirtual: {$eq: ['$type', EVENT_TYPE.VIRTUAL]},
                isFree: {$eq: ['$ticketPrice', 0]},
            },
        },
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
                            title: 1,
                            description: 1,
                            date: 1,
                            location: 1,
                            ticketPrice: 1,
                            capacity: 1,
                            status: 1,
                            type: 1,
                            category: {
                                id: '$category._id',
                                name: '$category.name',
                                description: '$category.description',
                            },
                            virtualUrl: 1,
                            isVirtual: 1,
                            isFree: 1,
                            address: 1,
                            startTime: 1,
                            endTime: 1,
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
    return {data: resultData, total: resultTotal?.[0].count, page, limit};
}

export async function deleteEvent(this: typeof EventModel, objectId: mongoose.Types.ObjectId) {
    return this.findByIdAndUpdate(objectId, {isDeleted: true}, {new: true})
        .populate('category', '_id name description')
        .exec();
}

export async function updateEvent(
    this: typeof EventModel,
    objectId: mongoose.Types.ObjectId,
    updatedData: Partial<IEvent>,
    options: mongoose.QueryOptions = {new: true},
) {
    return this.findByIdAndUpdate(objectId, {...updatedData}, options)
        .populate('category', '_id name description')
        .exec();
}

export type GetSettingEventCategoriesResult = {
    category: {
        all: {id: string; name: string}[];
        active: {id: string; name: string}[];
    };
};

export type GetSettingsForDashboardParams = {userId: string};
export type GetSettingsForDashboardResult = {};

export async function getSettingsForDashboard(
    this: typeof EventModel,
    params: GetSettingsForDashboardParams,
) {
    const {userId} = params;
    const matchQuery = {user: new mongoose.Types.ObjectId(userId), isDeleted: false};

    const result = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $facet: {
                priceRange: [
                    {
                        $group: {
                            _id: null,
                            max: {$max: '$ticketPrice'},
                            min: {$min: '$ticketPrice'},
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            min: 1,
                            max: 1,
                        },
                    },
                ],
            },
        },
    ]);

    // THERE MIGHT BE A BETTER WAY TO DO THIS?
    const priceRangeData = result?.[0].priceRange?.[0] || {min: 0, max: 0};
    const resultData = {tickets: {priceRange: priceRangeData}};
    return resultData;
}
