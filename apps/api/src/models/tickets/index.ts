import mongoose from 'mongoose';
import ticketsSchema, {ITicket, ITicketModel} from './schema';
import * as statics from './statics';
import * as methods from './methods';
import {modelNames} from '../../config';

Object.assign(ticketsSchema.statics, statics)
Object.assign(ticketsSchema.methods, methods)

const TicketsModel = mongoose.model<ITicket, ITicketModel>(modelNames.tickets, ticketsSchema);

export default TicketsModel;
