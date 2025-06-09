import mongoose from 'mongoose';

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface IUserDocument extends mongoose.Document {
  _id: mongoose.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  createUser(input: ICreateUser): Promise<Omit<IUserDocument, 'password'>>;
  getUser(id: string): Promise<IUserDocument>;
}
