import { AppError, ERROR_ENUM } from '@/models/AppError';
import type { ICreateEvent, IEventsModel } from './types';

export async function createEvent(this: IEventsModel, input: ICreateEvent) {
  try {
    const event = await this.create({ ...input });
    return event.toObject();
  } catch (error: any) {
    throw new AppError(
      (error as Error).message ?? 'Failed to create event',
      ERROR_ENUM.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function getEvent(this: IEventsModel, id: string) {
  try {
    const event = await this.findById(id).lean();
    return event;
  } catch (error) {
    throw new AppError('Unable to get resource', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getEvents(this: IEventsModel) {
  try {
    // this might needs to be an aggregation statement
    const events = await this.find({}).lean();
    return events;
  } catch (error) {
    throw new AppError('Unable to get resources', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}
