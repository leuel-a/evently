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
      validate: {
        validator: function (this: IEventsDocument, value: string): boolean {
          return dayjs(value) < dayjs(this.endDate);
        },
        message: 'Start date must be before the end date.',
      },
    },
    endDate: { type: Date, required: true },
    capacity: { type: Number, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default eventsSchema;
