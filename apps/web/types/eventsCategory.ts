import type { IEventCategory } from '@evently/models/eventsCategory/types';
import type { IApiResponse, IBaseModel, IPageResultData } from './utils';

export type IEventCategoryApiResponse = IBaseModel & IEventCategory & { id: string };

export type GetEventCategoryApiResponse = IApiResponse<IEventCategoryApiResponse>;

export type CreateEventsCategoryApiResponse = IApiResponse<
    Omit<IEventCategoryApiResponse, 'isDeleted'>
>;

export type GetEventsCategoryApiResponse = IApiResponse<IEventCategoryApiResponse[]> &
    IPageResultData;
