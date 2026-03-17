import mongoose from 'mongoose';
import ticketsSchema from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(ticketsSchema.statics, statics)
Object.assign(ticketsSchema.methods, methods)

/** @type {import('mongoose').Model} */
const TicketsModel = mongoose.model(modelNames.tickets, ticketsSchema);

export default TicketsModel;
