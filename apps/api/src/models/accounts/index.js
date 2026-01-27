import mongoose from 'mongoose';
import accountSchema from './schema.js';
import * as statics from './statics';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(accountSchema.statics, statics);
Object.assign(accountSchema.methods, methods);

/** @type {import('mongoose').Model} */
const AccountsModel = mongoose.model(modelNames.account, accountSchema);

export default AccountsModel;
