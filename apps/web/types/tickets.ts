import {IEvent} from './events';
import {IApiResponse} from './utils';

export const TICKET_STATUS = ['PAID', 'REFUNDED', 'PENDING'] as const;

export interface ITicket {
    event: Partial<IEvent>;
    purchaserName: string;
    purchaserEmail: string;
    paymentId: string;
    amountPaid: number;
    currency: string;
    status: (typeof TICKET_STATUS)[number];
}

export type GetTicketsApiResponse = IApiResponse<ITicket[]> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
