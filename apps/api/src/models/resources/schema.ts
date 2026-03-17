import mongoose from 'mongoose';

export interface IResource {
    name: string;
}

export type ResourceDocument = IResource &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {timestamps: true},
);

export default schema;
