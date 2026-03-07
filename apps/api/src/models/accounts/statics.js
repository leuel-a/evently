import mongoose from 'mongoose';

/**
 * Get linked accounts for the user
 *
 * @this {import('mongoose').Model}
 */
export async function getLinkedAccounts(id) {
    const matchQuery = {userId: new mongoose.Types.ObjectId(id)};

    const accounts = await this.aggregate([
        {
            $match: matchQuery,
        },
        {
            $project: {
                _id: 0,
                accountId: 1,
                providerId: 1,
            },
        },
    ]).exec();

    return {data: accounts};
}
