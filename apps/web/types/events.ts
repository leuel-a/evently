import {IApiResponse} from './utils';
import {IEventsCategory} from './eventsCategory';

export enum EVENT_STATUS {
    DRAFT = 'draft',
    ACTIVE = 'active',
    CLOSED = 'closed',
}

export enum EVENT_TYPE {
    PHYSICAL = 'physical',
    VIRTUAL = 'virtual',
    HYBRID = 'hybrid',
}

export interface IEvent {
    id: string;
    title: string;
    description: string;
    date: Date;
    location?: string;
    country: string;
    ticketPrice: number;
    capacity: number;
    category: IEventsCategory;
    checkoutLink?: string;
    status: EVENT_STATUS;
    type: EVENT_TYPE;
    createdAt: Date;
    user: string;
    updatedAt: Date;
    virtualUrl?: string;
    startTime: string;
    endTime: string;
    isVirtual: boolean;
    isFree: boolean;
    address: string;
}

export type GetEventsApiResponse = IApiResponse<IEvent[]> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type CreateEventApiResponse = IApiResponse<IEvent>;
export type UpdateEventApiResponse = IApiResponse<IEvent>;
