import { IApiResponse } from './utils';
import type { IEvent } from '@evently/models/events';

export type IEventApiResponse = IEvent & {
    id: string;
    isVirtual: boolean;
    isFree: boolean;
};

export type GetEventApiResponse = IApiResponse<IEventApiResponse>;

export type GetEventsApiResponse = IApiResponse<IEventApiResponse> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type CreateEventApiResponse = IApiResponse<IEvent>;
export type UpdateEventApiResponse = IApiResponse<IEvent>;
