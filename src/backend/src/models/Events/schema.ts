import dayjs from 'dayjs';
import mongoose from 'mongoose';
import type { IEventsDocument } from './types';

const eventsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, required: true },
    startDate: {
      type: Date,
      required: true,
      // TODO: should i add validation error at the schema level
      validate: {
        validator: function (this: IEventsDocument, value: string): boolean {
          return dayjs(value) < dayjs(this.endDate);
        },
        message: 'Start date must be before the end date.',
      },
    },
    location: { type: String, required: false },
    isRemote: { type: Boolean, required: true, default: true },
    endDate: { type: Date, required: true },
    capacity: { type: Number, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
);

export default eventsSchema;
