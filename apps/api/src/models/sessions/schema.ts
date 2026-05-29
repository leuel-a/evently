import mongoose from 'mongoose';
import {modelNames} from '../../config.js';

export interface ISession {
    expiresAt: Date;
    token: string;
    ipAddress: string;
    userAgent: string;
    userId: mongoose.Schema.Types.ObjectId;
}

export type SessionDocument = ISession &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

const schema = new mongoose.Schema<ISession>(
    {
        expiresAt: {type: Date, required: true},
        token: {type: String, required: true, unique: true},
        ipAddress: {type: String},
        userAgent: {type: String},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: modelNames.user, required: true},
    },
    {timestamps: true},
);

export default schema;
