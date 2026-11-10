import mongoose from 'mongoose';
import {modelNames} from '../config';
import resourcesSchema from './schema';
import * as statics from './statics';
import * as methods from './methods';
import type {IResource, IResourceModel} from './types';

Object.assign(resourcesSchema.statics, statics);
Object.assign(resourcesSchema.methods, methods);

const ResourceModel = mongoose.model<IResource, IResourceModel>(
    modelNames.resource,
    resourcesSchema,
);

export default ResourceModel;
