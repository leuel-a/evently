import mongoose from 'mongoose';
import {modelNames} from '../../config.js';

/**
 * @typedef {import('../../utils/types.js').Session Session}
 * @type {import('mongoose').Schema<User>}
 */
const schema = new mongoose.Schema(
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
