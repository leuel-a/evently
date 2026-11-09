import mongoose from 'mongoose';
import {collectionNames} from '../config';

export interface IVerification {
    identifier: string;
    value: string;
    expiresAt: Date;
}

export type VerificationDocument = IVerification &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IVerificationModel extends mongoose.Model<IVerification> {}

const schema = new mongoose.Schema(
    {
        identifier: {type: String, required: true},
        value: {type: String, required: true},
        expiresAt: {type: Date, required: true},
    },
    {timestamps: true, collection: collectionNames.verification},
);

export default schema;
