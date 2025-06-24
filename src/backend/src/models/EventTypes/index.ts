import mongoose from 'mongoose';
import { modelNames } from '../constants';
import eventTypesSchema from './schema';
import * as staticFunctions from './statics';
import type {IEventTypeDocument, IEventTypeModel} from './types';

Object.assign(eventTypesSchema.statics, staticFunctions);

const EventTypes = mongoose.model<IEventTypeDocument, IEventTypeModel>(modelNames.EVENT_TYPES, eventTypesSchema);

export default EventTypes;
