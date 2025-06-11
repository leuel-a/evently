import createHttpError from 'http-errors';
import type { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import { HTTP_STATUS } from '@/constants/statusCodes';
import { ApiError } from '@/models/ApiError';
import { AppError, ERROR_ENUM } from '@/models/AppError';

export function createApiError(error: any) {
  let http_error: HttpError;

  if (error instanceof ApiError) {
    console.log(`error instanceof ApiError ${error instanceof ApiError}`);
    http_error = createHttpError(error.statusCode, error.enum);
  } else if (error instanceof AppError) {
    console.log(`error instanceof AppError ${error instanceof AppError}`);
    http_error = createHttpError(HTTP_STATUS.BAD_REQUEST, error.enum);
  } else {
    http_error = createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.enum);
  }
  return http_error;
}

export function convertToObjectId(value: string) {
  try {
    const objectId = new mongoose.Types.ObjectId(value);
    return objectId;
  } catch (error) {
    throw new AppError('Not a valid Mongo ID', ERROR_ENUM.INVALID_MONGO_OBJECT_ID);
  }
}
