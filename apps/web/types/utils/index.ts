import {ApiError} from '@/lib/error';

export type IApiResponse<T = any> = {
    data: T;
};

export interface IActionResult<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}
