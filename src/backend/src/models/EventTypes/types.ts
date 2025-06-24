import mongoose from 'mongoose';

export interface IBaseEventType {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateEventType extends IBaseEventType {}

export interface IEventTypeDocument extends IBaseEventType, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventTypeModel extends mongoose.Model<IEventTypeDocument> {
  // static functions
  createEventType(input: ICreateEventType): Promise<IEventTypeDocument>;
  getEventTypes(): Promise<IEventTypeDocument>;
  getEventType(id: string): Promise<IEventTypeDocument>;
}
