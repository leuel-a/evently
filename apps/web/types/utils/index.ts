import {ApiError} from '@/lib/error';

export interface IApiResponse<T = unknown> {
    data: T;
}

export interface IBaseModel {
    createdAt: string;
    updatedAt: string;
}

export interface IPageResultData {
    page: number;
    total: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface IActionResult<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}
