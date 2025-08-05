import {AppError, ValidationErrorDetails} from '@/lib/error';

export type IActionState = {
    data?: any;
    success?: boolean | undefined;
    error?: ValidationErrorDetails[] | AppError | null;
};
