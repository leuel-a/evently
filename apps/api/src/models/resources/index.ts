import mongoose from 'mongoose';
import resourcesSchema, {IResource, IResourceModel} from './schema';
import * as statics from './statics';
import {modelNames} from '../../config';

Object.assign(resourcesSchema.statics, statics);

const ResourceModel = mongoose.model<IResource, IResourceModel>(
    modelNames.resource,
    resourcesSchema,
);

export default ResourceModel;
