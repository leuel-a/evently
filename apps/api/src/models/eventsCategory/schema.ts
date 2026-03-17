import mongoose from 'mongoose';

export interface IEventCategory {
    name: string;
    description: string;
    isDeleted: boolean;
}

export type EventCategoryDocument = IEventCategory &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

const schema = new mongoose.Schema<IEventCategory>(
    {
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        isDeleted: {type: Boolean, required: false, default: false},
    },
    {timestamps: true},
);

export default schema;
