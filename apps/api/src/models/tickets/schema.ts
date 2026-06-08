import mongoose from 'mongoose';
import {modelNames} from '../../config';
import {
    GetTicketsParams,
    GetTicketsResult,
    GetTicketsRevenueByMonthAndYearParams,
    GetTicketsRevenueByMonthAndYearResult,
} from './statics';

export const TICKET_STATUS = Object.freeze({
    PAID: 'PAID',
    REFUNDED: 'REFUNDED',
    PENDING: 'PENDING',
});

export interface ITicket {
    event: mongoose.Schema.Types.ObjectId;
    purchaserName: String;
    purchaserEmail: String;
    paymentId: String;
    amountPaid: Number;
    currency: String;
    status: String;
}

export type TicketDocument = ITicket &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface ITicketModel extends mongoose.Model<TicketDocument> {
    getTickets(this: ITicketModel, params: GetTicketsParams): Promise<GetTicketsResult>;

    getTicketsRevenueByMonthAndYear(
        this: ITicketModel,
        _params: GetTicketsRevenueByMonthAndYearParams,
    ): Promise<GetTicketsRevenueByMonthAndYearResult>;
}

const schema = new mongoose.Schema<ITicket>(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: modelNames.events,
            required: true,
        },
        purchaserName: {type: String, required: true},
        purchaserEmail: {type: String, required: true},
        paymentId: {type: String, required: true, unique: true},
        amountPaid: {type: Number, required: true},
        currency: {type: String, required: true},
        status: {
            type: String,
            enum: Object.keys(TICKET_STATUS),
            default: TICKET_STATUS.PENDING,
        },
    },
    {timestamps: true},
);

export default schema;
