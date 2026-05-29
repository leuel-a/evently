import mongoose from 'mongoose';
import accountSchema, {IAccount, IAccountModel} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(accountSchema.statics, statics);
Object.assign(accountSchema.methods, methods);

const AccountsModel = mongoose.model<IAccount, IAccountModel>(modelNames.account, accountSchema);

export default AccountsModel;
