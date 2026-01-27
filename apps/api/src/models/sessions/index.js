import mongoose from 'mongoose';
import sessionsSchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(sessionsSchema.statics, statics);
Object.assign(sessionsSchema.methods, methods);

/** @type {import('mongoose').Model} */
const SessionsModel = mongoose.model(modelNames.session, sessionsSchema);

export default SessionsModel;
