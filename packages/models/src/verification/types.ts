import mongoose from 'mongoose';

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
