import mongoose from 'mongoose';
import type { GetLinkedAccountsResult } from './statics';

export interface IAccount {
    accountId: string;
    providerId: string;
    userId: mongoose.Types.ObjectId;
    accessToken: string;
    refreshToken: string;
    idToken: string;
    accessTokenExpiresAt: Date;
    refreshTokenExpiresAt: Date;
    scope: string;
    password: string;
}

export type AccountDocument = IAccount &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IAccountModel extends mongoose.Model<AccountDocument> {
    getLinkedAccounts(
        this: IAccountModel,
        id: string,
    ): Promise<GetLinkedAccountsResult>;
}
