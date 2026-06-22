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
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
