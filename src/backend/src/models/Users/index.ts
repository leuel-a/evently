import mongoose from 'mongoose';
import { modelNames } from '../constants';
import userSchema from './schema';
import * as staticFunctions from './statics';
import { IUserDocument, IUserModel } from './types';

Object.assign(userSchema.statics, staticFunctions);

const User = mongoose.model<IUserDocument, IUserModel>(modelNames.USERS, userSchema);

export default User;
