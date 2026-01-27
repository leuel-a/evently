import mongoose from 'mongoose';
import eventsCategorySchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(eventsCategorySchema.statics, statics);
Object.assign(eventsCategorySchema.methods, methods);

/** @type {import('mongoose').Model} */
const EventsCategoryModel = mongoose.model(modelNames.eventsCategory, eventsCategorySchema);

export default EventsCategoryModel;
