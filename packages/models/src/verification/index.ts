import mongoose from 'mongoose';
import verificationSchema from './schema';
import type {IVerification, IVerificationModel} from './types';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../config';

Object.assign(verificationSchema.statics, statics);
Object.assign(verificationSchema.methods, methods);

const VerificationModel = mongoose.model<IVerification, IVerificationModel>(
    modelNames.verification,
    verificationSchema,
);

export default VerificationModel;
