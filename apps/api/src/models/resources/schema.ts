import mongoose from 'mongoose';
import { GetResourcesResult } from './statics';

export interface IResource {
    name: string;
}

export type ResourceDocument = IResource &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IResourceModel extends mongoose.Model<ResourceDocument> {
    getResources(): Promise<GetResourcesResult>
}

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {timestamps: true},
);

export default schema;
