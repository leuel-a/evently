import mongoose from 'mongoose';
import eventsCategorySchema, {IEventCategory} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(eventsCategorySchema.statics, statics);
Object.assign(eventsCategorySchema.methods, methods);

const EventsCategoryModel = mongoose.model<IEventCategory>(modelNames.eventsCategory, eventsCategorySchema);

export default EventsCategoryModel;
