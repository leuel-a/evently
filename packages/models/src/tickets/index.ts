import mongoose from 'mongoose';
import ticketsSchema, { TICKET_STATUS } from './schema';
import type { ITicket, ITicketModel, TicketDocument } from './schema'
import * as statics from './statics';
import * as methods from './methods';
import { modelNames } from '../config';

Object.assign(ticketsSchema.statics, statics)
Object.assign(ticketsSchema.methods, methods)

const TicketsModel = (mongoose.models[modelNames.tickets] as ITicketModel | undefined)
    ?? mongoose.model<ITicket, ITicketModel>(modelNames.tickets, ticketsSchema);

export type { ITicket, ITicketModel, TicketDocument };
export { TICKET_STATUS };
export default TicketsModel;
