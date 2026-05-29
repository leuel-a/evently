import mongoose from 'mongoose';
import {modelNames, collectionNames} from '../../config';

export interface IUser {
    name: string;
    email: string;
    emailVerified: boolean;
    isOrganizer: boolean;
    organizationName: string;
    image: string;
    sessions: mongoose.Schema.Types.ObjectId[];
    accounts: mongoose.Schema.Types.ObjectId[];
}

export type UserDocument = IUser &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

const schema = new mongoose.Schema<IUser>(
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
