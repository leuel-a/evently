import mongoose from 'mongoose';
import resourcesSchema from './schema.js';
import * as statics from './statics.js';
import {modelNames} from '../../config.js';

Object.assign(resourcesSchema.statics, statics);

/** @type {import('mongoose').Model} */
const ResourceModel = mongoose.model(modelNames.resource, resourcesSchema);

export default ResourceModel;
