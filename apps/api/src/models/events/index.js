import mongoose from 'mongoose';
import eventsSchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(eventsSchema.statics, statics);
Object.assign(eventsSchema.methods, methods);

/** @type {import('mongoose').Model} */
const EventsModel = mongoose.model(modelNames.events, eventsSchema);

export default EventsModel;
