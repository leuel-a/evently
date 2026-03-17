import mongoose from 'mongoose';
import verificationSchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(verificationSchema.statics, statics);
Object.assign(verificationSchema.methods, methods);

/** @type {import('mongoose').Model} */
const SessionsModel = mongoose.model(modelNames.verification, verificationSchema);

export default SessionsModel;
