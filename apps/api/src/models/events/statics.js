import {getPaginationValues} from '../helpers/index.js';
import {normalizeID} from '../helpers/aggregations.js';
import {getEventProjection} from './utils.js';
import {modelNames} from '../../config.js';
import {EVENT_TYPE} from './schema.js';

/**
 * Get a single event based on the criteria
 *
 * @this {import('mongoose').Model}
 * @param {Object} param0
 * @param {string} param0.id
 *
 * @param {import('mongoose').QueryOptions} options
 */
export async function getEvent({id}, opts = {}) {
    /** @type {import('mongoose').FilterQuery<import('../../utils/types.js').EventDocument>} */
    const query = {_id: id};

    const projection = getEventProjection();
    const options = {...opts};

    const event = await this.findOne(query, projection, options);
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

/**
 * Creates a new Event
 *
 * @this {import('mongoose').Model}
 * @param {import('../../utils/types.js').Event} payload - the new event to be added to the DB
 */
export async function createEvent(payload) {
    const event = await this.create(payload);
    return event;
}

/**
 * Finds Events based on the query options
 *
 * @this {import('mongoose').Model}
 * @param {import('mongoose').FilterQuery} [matchQuery]
 */
export async function getEvents({page, size}) {
    const matchQuery = {isDeleted: false};
    const {limit, skip} = getPaginationValues(page, size);

    const events = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $lookup: {
                from: this.model(modelNames.eventsCategory).collection.name,
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
            $skip: skip,
        },
        {
            $limit: limit,
        },
        ...normalizeID(),
        {
            $project: {
                id: 1,
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
    ]).exec();

    return {data: events, page, limit: size};
}

/**
 * Finds an event and marks it as a deleted event
 *
 * @this {import('mongoose').Model}
 * @param {import('mongoose').ObjectId} objectId
 */
export async function deleteEvent(objectId) {
    return this.findByIdAndUpdate(objectId, {isDeleted: true}, {new: true})
        .populate('category', '_id name description')
        .exec();
}

/**
 * Updates an event
 *
 * @this {import('mongoose').Model}
 * @param {string} id
 * @param {import('mongoose').QueryOptions} [options]
 */
export async function updateEvent(objectId, updatedData, options = {new: true}) {
    return this.findByIdAndUpdate(objectId, {...updatedData}, options)
        .populate('category', '_id name description')
        .exec();
}

/**
 * @this {import('mongoose').Model}
 */
export async function getSettingEventCategories() {
    const [allCategories, activeCategories] = await Promise.all([
        this.model(modelNames.eventsCategory).aggregate([
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
                    from: this.model(modelNames.eventsCategory).collection.name,
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
                $project: {
                    id: '$category._id',
                    name: '$category.name',
                },
            },
            ...normalizeID(),
        ]),
    ]);
    return {
        category: {
            all: allCategories,
            active: activeCategories,
        },
    };
}
