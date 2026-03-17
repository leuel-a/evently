import mongoose from 'mongoose';
import usersSchema from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(usersSchema.statics, statics);
Object.assign(usersSchema.methods, methods);

const UsersModel = mongoose.model(modelNames.user, usersSchema);

export default UsersModel;
