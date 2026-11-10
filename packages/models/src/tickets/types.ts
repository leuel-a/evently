import mongoose from 'mongoose';
import type {
    GetTicketsParams,
    GetTicketsResult,
    GetTicketsRevenueByMonthAndYearParams,
    GetTicketsRevenueByMonthAndYearResult,
} from './statics';

export interface ITicket {
    event: mongoose.Types.ObjectId;
    purchaserName: string;
    purchaserEmail: string;
    paymentId: string;
    amountPaid: number;
    currency: string;
    status: string;
}

export type TicketDocument = ITicket &
    mongoose.Document & {
        createdAt: string;
        updatedAt: string;
    };

export interface ITicketModel extends mongoose.Model<TicketDocument> {
    getTickets(
        this: ITicketModel,
        params: GetTicketsParams,
    ): Promise<GetTicketsResult>;

    getTicketsRevenueByMonthAndYear(
        this: ITicketModel,
        _params: GetTicketsRevenueByMonthAndYearParams,
    ): Promise<GetTicketsRevenueByMonthAndYearResult>;
}
