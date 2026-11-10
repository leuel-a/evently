import mongoose from 'mongoose';

export interface ISession {
    expiresAt: Date;
    token: string;
    ipAddress: string;
    userAgent: string;
    userId: mongoose.Types.ObjectId;
}

export type SessionDocument = ISession &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface ISessionModel extends mongoose.Model<SessionDocument> {}
