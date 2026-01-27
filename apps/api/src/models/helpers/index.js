import mongoose from 'mongoose';

/**
 * Parse pagination values for the given values
 */
export function getPaginationValues(page = 1, limit = 10) {
    const parsedPage = Number.parseInt(page || '1', 10);
    const parsedLimit = Number.parseInt(limit || '10', 10);

    const skip = parsedLimit * (parsedPage - 1);
    return {limit: parsedLimit, skip};
}

/**
 * Converts an id to an Object ID
 *
 * @param {string} id
 */
export function convertIdToObjectId(id) {
    return new mongoose.Types.ObjectId(id);
}
