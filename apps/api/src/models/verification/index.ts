import mongoose from 'mongoose';
import verificationSchema from './schema.js';
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';

Object.assign(verificationSchema.statics, statics);
Object.assign(verificationSchema.methods, methods);

/** @type {import('mongoose').Model} */
const SessionsModel = mongoose.model(modelNames.verification, verificationSchema);

export default SessionsModel;
