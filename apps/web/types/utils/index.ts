import {ApiError} from '@/lib/error';

export type IApiResponse<T = unknown> = {
    data: T;
};

export interface IActionResult<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}
