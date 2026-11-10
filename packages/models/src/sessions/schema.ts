import mongoose from 'mongoose';
import { modelNames } from '../config';
import type { ISession } from './types';

const schema = new mongoose.Schema<ISession>(
    {
        expiresAt: { type: Date, required: true },
        token: { type: String, required: true, unique: true },
        ipAddress: { type: String },
        userAgent: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
    },
    { timestamps: true },
);

export default schema;
