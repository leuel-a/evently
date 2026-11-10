import mongoose from 'mongoose';
import type {GetResourcesResult} from './statics';

export interface IResource {
    name: string;
}

export type ResourceDocument = IResource &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface IResourceModel extends mongoose.Model<ResourceDocument> {
    getResources(): Promise<GetResourcesResult>;
}
