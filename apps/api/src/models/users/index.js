import mongoose from 'mongoose';
import usersSchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(usersSchema.statics, statics);
Object.assign(usersSchema.methods, methods);

/** @type {import('mongoose').Model} */
const UsersModel = mongoose.model(modelNames.user, usersSchema);

export default UsersModel;
