import type {ITicket} from '@evently/models/tickets/types';
import {IEventApiResponse} from './events';
import {IApiResponse, IPageResultData, IBaseModel} from './utils';

export type ITicketApiResponse = IBaseModel &
    Omit<ITicket, 'event'> & {
        event: Partial<IEventApiResponse>;
    };

export type GetTicketApiResponse = IApiResponse<ITicketApiResponse>;

export type GetTicketsApiResponse = IApiResponse<ITicketApiResponse[]> & IPageResultData;
