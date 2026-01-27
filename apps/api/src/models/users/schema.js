import mongoose from 'mongoose';
import {modelNames, collectionNames} from '../../config.js';

/**
 * @typedef {import('../../utils/types.js').User User}
 * @type {import('mongoose').Schema<User>}
 */
const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {
            type: String,
            required: true,
            unique: true,
        },
        emailVerified: {type: Boolean, default: false},
        isOrganizer: {type: Boolean, default: false},
        organizationName: {type: String},
        image: {type: String},
        sessions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: modelNames.session,
            },
        ],
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: modelNames.account,
            },
        ],
    },
    {timestamps: true, collection: collectionNames.user},
);

export default schema;
