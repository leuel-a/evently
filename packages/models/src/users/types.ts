import mongoose from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    emailVerified: boolean;
    isOrganizer: boolean;
    organizationName: string;
    image: string;
    sessions: mongoose.Types.ObjectId[];
    accounts: mongoose.Types.ObjectId[];
}


export type UserDocument = IUser &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IUserModel extends mongoose.Model<UserDocument> {
}
