import mongoose from 'mongoose';

export interface IBaseEvent {
  title: string;
  description: string;
  startDate: string; // needs to be an ISO string
  endDate: string; // needs to be an ISO string
  capacity: number;
  createdBy: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateEvent extends IBaseEvent {}

export interface IEventsDocument extends IBaseEvent, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEventsModel extends mongoose.Model<IEventsDocument> {
  // static functions
  createEvent(input: ICreateEvent): Promise<IEventsDocument>;
}
