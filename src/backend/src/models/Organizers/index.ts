import mongoose from 'mongoose';
import { modelNames } from '../constants';
import organizersSchema from './schema';
import * as staticFunctions from './statics';

Object.assign(organizersSchema.statics, staticFunctions);

const Organizers = mongoose.model(modelNames.ORGANIZERS, organizersSchema);

export default Organizers;
