import {AppError, ValidationErrorDetails} from '@/lib/error';

export type IActionState<T = any> = {
    data?: T;
    success?: boolean | undefined;
    error?: ValidationErrorDetails[] | AppError | null;
};
