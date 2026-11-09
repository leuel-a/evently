import type { IApiResponse } from './utils';
import type { IEventCategory } from '@evently/models/eventsCategory';

export type CreateEventsCategoryApiResponse = IApiResponse<Omit<IEventCategory, 'isDeleted'>>;

export type GetEventsCategoryApiResponse = IApiResponse<IEventCategory[]> & {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
