import mongoose from 'mongoose';
import {modelNames, collectionNames} from '../config';
import type {IAccount} from './types';

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
