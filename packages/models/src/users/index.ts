import mongoose from 'mongoose';
import usersSchema from './schema';
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';
import type { IUser, IUserModel } from './types';

Object.assign(usersSchema.statics, statics);
Object.assign(usersSchema.methods, methods);

const UsersModel = mongoose.model<IUser, IUserModel>(modelNames.user, usersSchema);

export default UsersModel;
