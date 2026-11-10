import mongoose from 'mongoose';
import { collectionNames } from '../config';
import type { IVerification } from './types';

const schema = new mongoose.Schema<IVerification>(
    {
        identifier: { type: String, required: true },
        value: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true, collection: collectionNames.verification },
);

export default schema;
