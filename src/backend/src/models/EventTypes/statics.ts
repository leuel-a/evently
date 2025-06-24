import {AppError, ERROR_ENUM} from '@/models/AppError';
import type {ICreateEventType, IEventTypeModel} from './types';

export async function createEventType(this: IEventTypeModel, input: ICreateEventType) {
  try {
    const eventType = await this.create(input);
    return eventType.toObject();
  } catch (error) {
    throw new AppError('Failed to create event type', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getEventTypes(this: IEventTypeModel) {
  try {
    const eventTypes = await this.find({}).lean();
    return eventTypes;
  } catch (error) {
    throw new AppError('Unable to get event types', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getEventType(this: IEventTypeModel, id: string) {
  try {
    const eventType = await this.findById(id);

    if (!eventType) {
      throw new AppError('Event Type not found', ERROR_ENUM.RESOURCE_NOT_FOUND);
    }
    return eventType.toObject();
  } catch (error) {
    if (error instanceof AppError) throw error;
    // if its a mongoose error, should I log the error here
    throw new AppError('Failed to retrieve event types', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}
