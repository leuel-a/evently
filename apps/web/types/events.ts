import type {IEvent} from '@evently/models/events/types';
import type {IEventCategoryApiResponse} from './eventsCategory';
import type {IApiResponse, IBaseModel, IPageResultData} from './utils';

export type IEventApiResponse = IBaseModel &
    Omit<IEvent, 'category'> & {
        category: IEventCategoryApiResponse;
        id: string;
        isVirtual: boolean;
        isFree: boolean;
    };

export type GetEventApiResponse = IApiResponse<IEventApiResponse>;

export type GetEventsApiResponse = IApiResponse<IEventApiResponse[]> & IPageResultData;

export type CreateEventApiResponse = IApiResponse<IEvent>;

export type UpdateEventApiResponse = IApiResponse<IEvent>;
