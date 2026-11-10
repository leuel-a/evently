import mongoose from 'mongoose';
import { modelNames } from '../config';
import type { IEventCategory } from './types';

const schema = new mongoose.Schema<IEventCategory>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        isDeleted: { type: Boolean, required: false, default: false },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.user,
            required: true,
        },
    },
    { timestamps: true },
);

// INFO: read more about indexes
// Checkout this link: https://www.mongodb.com/docs/manual/indexes/
schema.index({ name: 'text', description: 'text' });

export default schema;
