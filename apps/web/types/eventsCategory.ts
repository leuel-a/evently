import type {IApiResponse} from './utils';

export interface IEventsCategory {
    id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    createdAt: string;
    updateAt: string;
}

export type CreateEventsCategoryApiResponse = IApiResponse<Omit<IEventsCategory, 'isDeleted'>>;

export type GetEventsCategoryApiResponse = IApiResponse<IEventsCategory[]> & {
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
