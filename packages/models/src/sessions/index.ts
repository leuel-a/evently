import mongoose from 'mongoose';
import sessionsSchema, { ISession, ISessionModel } from './schema';
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';

Object.assign(sessionsSchema.statics, statics);
Object.assign(sessionsSchema.methods, methods);

const SessionsModel = (mongoose.models[modelNames.session])
    ?? mongoose.model<ISession, ISessionModel>(modelNames.session, sessionsSchema);

export type { ISession, ISessionModel };
export default SessionsModel;
