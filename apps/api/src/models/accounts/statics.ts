import mongoose from 'mongoose';
import type {IAccountModel, AccountDocument} from './schema';

export type GetLinkedAccountsResult = {
    data: Array<Pick<AccountDocument, 'accountId' | 'providerId'>>
};

export async function getLinkedAccounts(this: IAccountModel, id: string) {
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
