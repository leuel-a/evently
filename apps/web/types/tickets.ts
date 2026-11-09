import { IApiResponse } from './utils';
import { IEventApiResponse } from './events';
import { TICKET_STATUS } from '@evently/models/tickets';

export interface ITicket {
    event: Partial<IEventApiResponse>;
    purchaserName: string;
    purchaserEmail: string;
    paymentId: string;
    amountPaid: number;
    currency: string;
    status: (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
}

export type GetTicketsApiResponse = IApiResponse<ITicket[]> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
