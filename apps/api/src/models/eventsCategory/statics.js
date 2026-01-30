import {getPaginationValues} from '../helpers/index.js';
import {normalizeID} from '../helpers/aggregations.js';
import {getEventCategoryProjection} from './utils.js';

/**
 * Get a single event category based on the criteria
 *
 * @this {import('mongoose').Model}
 * @param {Object} param0
 * @param {string} param0.id
 *
 * @param {import('mongoose').QueryOptions} options
 */
export async function getEventCategory({id}, opts = {lean: true}) {
    /** @type {import('mongoose').FilterQuery<import('../../utils/types.js').EventCategoryDocument>} */
    const matchQuery = {_id: id, isDeleted: false};

    const projection = getEventCategoryProjection();
    const options = {...opts};
    const eventCategory = await this.findOne(matchQuery, projection, options);

    return {
        data: eventCategory,
    };
}

/**
 * Creates a new Event Category
 *
 * @this {import('mongoose').Model}
 * @param {import('../../utils/types.js').EventCategory} payload - the new event to be added to the DB
 */
export async function createEventCategory(payload) {
    return this.create(payload);
}

/**
 * Finds Event Categories based on the query options
 *
 * @this {import('mongoose').Model}
 * @param {import('mongoose').FilterQuery} [matchQuery]
 */
export async function getEventCategories({page, size}) {
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
    ]).exec();

    return {data: eventsCategory, page, limit: size};
}

/**
 * Finds an event and marks it as a deleted event category
 *
 * @this {import('mongoose').Model}
 * @param {import('mongoose').ObjectId} objectId
 */
export async function deleteEventCategory(objectId) {
    return this.findByIdAndUpdate(objectId, {isDeleted: true}, {new: true});
}

/**
 * Updates an event category
 *
 * @this {import('mongoose').Model}
 * @param {string} id
 * @param {import('mongoose').QueryOptions} [options]
 */
export async function updateEventCategory(objectId, updatedData, options = {new: true}) {
    return this.findByIdAndUpdate(objectId, {...updatedData}, options);
}
