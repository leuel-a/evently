import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: {
      type: { type: String, enum: ['physical', 'virtual'], required: true },
      address: { type: String, trim: true },
      virtualLink: { type: String, trim: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    organizer: {
      name: { type: String, required: true, trim: true },
      contact: {
        email: { type: String, trim: true },
        phone: { type: String, trim: true },
      },
    },
    category: {
      type: String,
      enum: ['conference', 'workshop', 'concert', 'meetup', 'webinar', 'other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft',
    },
    capacity: { type: Number, min: 0 },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    registration: {
      required: { type: Boolean, default: false },
      deadline: { type: Date },
      fee: { type: Number, min: 0, default: 0 },
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);
