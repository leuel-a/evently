import mongoose from 'mongoose';
import {collectionNames} from '../../config.js';

/**
 * @typdef {import('../../utils/types.js').Verification Verification}
 * @type {import('mongoose').Schema<Verification>}
 */
const schema = new mongoose.Schema(
    {
        identifier: {type: String, required: true},
        value: {type: String, required: true},
        expiresAt: {type: Date, required: true},
    },
    {timestamps: true, collection: collectionNames.verification},
);

export default schema;
