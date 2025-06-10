import { AppError, ERROR_ENUM } from '@/models/AppError';
import type { ICreateEvent, IEventsModel } from './types';

export async function createEvent(this: IEventsModel, input: ICreateEvent) {
  try {
    const event = await this.create({ ...input });
    return event.toObject();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getEvent(this: IEventsModel, id: string) {
  try {
    const event = await this.findById(id).lean();

    if (!event) {
      throw new AppError('Event not found', ERROR_ENUM.RESOURCE_NOT_FOUND)
    }
    return event;
  } catch(error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Unable to get resource', ERROR_ENUM.INTERNAL_SERVER_ERROR)
  }
}
