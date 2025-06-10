import mongoose from 'mongoose';
import { modelNames } from '../constants';
import eventsSchema from './schema';
import * as staticFunctions from './statics';
import type { IEventsDocument, IEventsModel } from './types';

Object.assign(eventsSchema, staticFunctions);

const Event = mongoose.model<IEventsDocument, IEventsModel>(modelNames.EVENTS, eventsSchema);

export default Event;
