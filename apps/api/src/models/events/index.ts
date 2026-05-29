import mongoose from 'mongoose';
import eventsSchema, {IEvent, IEventModel} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(eventsSchema.statics, statics);
Object.assign(eventsSchema.methods, methods);

const EventsModel = mongoose.model<IEvent, IEventModel>(modelNames.events, eventsSchema);

export default EventsModel;
