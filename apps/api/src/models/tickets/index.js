import mongoose from 'mongoose';
import ticketsSchema from './schema.js';
import * as statics from './statics.js';
import * as methods from './methods.js';
import {modelNames} from '../../config.js';

Object.assign(ticketsSchema.statics, statics)
Object.assign(ticketsSchema.methods, methods)

/** @type {import('mongoose').Model} */
const TicketsModel = mongoose.model(modelNames.tickets, ticketsSchema);

export default TicketsModel;
