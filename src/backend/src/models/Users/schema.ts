import mongoose from 'mongoose';
import type { IUserDocument } from './types';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;

        return ret;
      },
    },
  },
);

userSchema.virtual('id').get(function (this: IUserDocument) {
  return (this._id as mongoose.ObjectId).toString();
});

export default userSchema;
