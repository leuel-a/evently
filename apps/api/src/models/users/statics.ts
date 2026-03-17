import mongoose from 'mongoose';
import {modelNames} from '../../config';
import UserModel from '.';

/**
 * Get the authenticated user linked accounts
 */
export async function getLinkedAccounts(this: typeof UserModel, id: string) {
    return await this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: mongoose.model(modelNames.account).collection.name,
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
