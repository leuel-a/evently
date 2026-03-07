import mongoose from 'mongoose';
import {modelNames} from '../../config.js';

/**
 * Get the authenticated user linked accounts
 *
 * @param {string} id
 * @this {import('mongoose').Model}
 */
export async function getLinkedAccounts(id) {
    return await this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: this.model(modelNames.account).collection.name,
                let: {userId: '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$userId', '$$userId'],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            providerId: 1,
                            accountId: 1,
                        },
                    },
                ],
                as: 'accounts',
            },
        },
        {
            $project: {
                _id: 0,
                accounts: 1,
            },
        },
    ]);
}
