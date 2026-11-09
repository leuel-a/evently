import mongoose from 'mongoose';
import verificationSchema, { IVerification, IVerificationModel } from './schema';
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';

Object.assign(verificationSchema.statics, statics);
Object.assign(verificationSchema.methods, methods);

const SessionsModel = (mongoose.models[modelNames.verification] as IVerificationModel | undefined)
    ?? mongoose.model<IVerification, IVerificationModel>(modelNames.verification, verificationSchema);

export default SessionsModel;
