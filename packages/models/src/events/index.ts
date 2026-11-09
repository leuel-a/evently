import mongoose from 'mongoose';
import eventsSchema from './schema'
import {
    type IEvent,
    type IEventModel,
    EVENT_STATUS,
    EVENT_TYPE
} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';

Object.assign(eventsSchema.statics, statics);
Object.assign(eventsSchema.methods, methods);

const EventsModel = mongoose.model<IEvent, IEventModel>(modelNames.events, eventsSchema);

export { EVENT_STATUS, EVENT_TYPE };
export type { IEvent, IEventModel };
export default EventsModel;
