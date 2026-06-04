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
    price: number;
    capacity: number;
    category: IEventsCategory;
    checkoutLink?: string;
    status: EVENT_STATUS;
    type: EVENT_TYPE;
    createdAt: Date;
    updatedAt: Date;
    virtualUrl?: string;
    startTime: string;
    endTime: string;
    isVirtual: boolean;
    isFree: boolean;
    address: string;
}

export type EventApiResponse = IApiResponse<IEvent[]> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
