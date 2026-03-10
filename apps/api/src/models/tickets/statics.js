import mongoose from 'mongoose';
import {modelNames} from '../../config.js';
import {normalizeID} from '../helpers/aggregations.js';
import {getPaginationValues} from '../helpers/index.js';

/**
 * Get orders for a user
 *
 * @this {import('mongoose').Model}
 */
export async function getTickets({userId, page, size, status}) {
    const matchQuery = {
        'event.user': new mongoose.Types.ObjectId(userId),
        ...(status && {status}),
    };

    const {limit, skip} = getPaginationValues(page, size);
    const result = await this.aggregate([
        {
            $lookup: {
                from: this.model(modelNames.events).collection.name,
                localField: 'event',
                foreignField: '_id',
                as: 'event',
            },
        },
        {
            $unwind: '$event',
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
                        $sort: {
                            createdAt: 1,
                        },
                    },
                    {
                        $project: {
                            id: '$_id',
                            _id: 0,
                            purchaserName: 1,
                            purchaserEmail: 1,
                            paymentId: 1,
                            amountPaid: 1,
                            currency: 1,
                            status: 1,
                            event: {
                                id: '$event._id',
                                title: '$event.title',
                                status: '$event.status',
                            },
                            eventId: 1,
                            createdAt: 1,
                            updatedAt: 1,
                        },
                    },
                ],
                total: [{$count: 'count'}],
            },
        },
    ]);

    const resultData = result?.[0]?.data;
    const resultTotal = result?.[0]?.total;
    return {data: resultData, total: resultTotal?.[0].count, page, limit};
}
