import {getPaginationValues} from '../helpers/index.js';
import {getEventProjection} from './utils.js';
import {modelNames} from '../../config.js';

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
    const matchQuery = {};
    const {limit, skip} = getPaginationValues(page, size);

    const events = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $lookup: {
                from: modelNames.eventsCategory,
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
            $skip: skip,
        },
        {
            $limit: limit,
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
