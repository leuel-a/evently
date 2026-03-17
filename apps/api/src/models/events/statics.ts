import mongoose from 'mongoose';
import EventModel from '.';
import {getPaginationValues} from '../helpers/index';
import {getEventProjection} from './utils';
import {modelNames} from '../../config';
import {EVENT_TYPE, IEvent} from './schema';

type GetEventParams = {id: string};
type GetEventResult = {data: IEvent | null};

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

type CreateEventPayload = IEvent;
export async function createEvent(this: typeof EventModel, payload: CreateEventPayload) {
    const event = await this.create(payload);
    return event;
}

type GetEventsParams = {page: string; size: string; userId: string};
export async function getEvents(this: typeof EventModel, params: GetEventsParams) {
    const {page, size, userId} = params;
    const matchQuery = {isDeleted: false, user: new mongoose.Types.ObjectId(userId)};
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

export async function getSettingEventCategories(this: typeof EventModel) {
    const [allCategories, activeCategories] = await Promise.all([
        mongoose.model(modelNames.eventsCategory).aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
            {
                $project: {
                    id: '$_id',
                    name: 1,
                    _id: 0,
                },
            },
        ]),
        this.aggregate([
            {
                $match: {
                    isDeleted: false,
                },
            },
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
                // TODO: normalizeID remove implement the proper projection for the id here
                $project: {
                    id: '$category._id',
                    name: '$category.name',
                },
            },
        ]),
    ]);

    return {
        category: {
            all: allCategories,
            active: activeCategories,
        },
    };
}
