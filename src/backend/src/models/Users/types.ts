import mongoose from 'mongoose';

export interface IBaseUser {
  email: string;
  password: string;
  firstName: string;
  dateOfBirth?: Date;
  lastName: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateUser extends IBaseUser {}

export interface IUserDocument extends IBaseUser, mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
  // static functions
  createUser(input: ICreateUser): Promise<IUserDocument>;
  getUser(id: string): Promise<IUserDocument>;
  getUserByEmail(email: string): Promise<IUserDocument>;
}
