import mongoose from 'mongoose';
import checkoutSchema, {type ICheckoutConfig} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(checkoutSchema.statics, statics);
Object.assign(checkoutSchema.methods, methods);

const CheckoutConfigModel = mongoose.model<ICheckoutConfig>(modelNames.checkout, checkoutSchema);

export default CheckoutConfigModel;
