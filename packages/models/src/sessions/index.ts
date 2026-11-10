import mongoose from 'mongoose';
import sessionsSchema from './schema';
import type {ISession, ISessionModel} from './types';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../config';

Object.assign(sessionsSchema.statics, statics);
Object.assign(sessionsSchema.methods, methods);

const SessionsModel = mongoose.model<ISession, ISessionModel>(
    modelNames.session,
    sessionsSchema,
);

export default SessionsModel;
