import mongoose from 'mongoose';
import { ORGANIZER_TYPES } from './constants';

const organizersSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    organizationName: { type: String, required: true, trim: true },
    organizationType: {
      type: String,
      enum: Object.values(ORGANIZER_TYPES),
      required: true,
    },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String }, // TODO: add website url validation at schema level
    },
    eventTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventtypes',
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export default organizersSchema;
