import mongoose from 'mongoose';
import {modelNames, collectionNames} from '../../config';

export interface IAccount {
    accountId: string;
    providerId: string;
    userId: mongoose.Schema.Types.ObjectId;
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

const schema = new mongoose.Schema<IAccount>(
    {
        accountId: {type: String, required: true},
        providerId: {type: String, required: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
        accessToken: {type: String},
        refreshToken: {type: String},
        idToken: {type: String},
        accessTokenExpiresAt: {type: Date},
        refreshTokenExpiresAt: {type: Date},
        scope: {type: String},
        password: {type: String},
    },
    {timestamps: true, collection: collectionNames.account},
);

export default schema;
