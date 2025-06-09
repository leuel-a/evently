import _ from 'lodash';
import mongoose from 'mongoose';

import { AppError, ERROR_ENUM } from '@/models/AppError';
import { hashPassword } from '@/utils/password';

import type { ICreateUser, IUserDocument } from './types';

export async function createUser(
  this: mongoose.Model<IUserDocument>,
  input: ICreateUser,
): Promise<Omit<IUserDocument, 'password'>> {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = input;

    const emailExists = await this.findOne({ email }).lean();
    if (emailExists) {
      throw new AppError(
        'Email is already registered, please try another email',
        ERROR_ENUM.EMAIL_ALREADY_TAKEN,
      );
    }

    const hashedPassword = await hashPassword(password);
    const userData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
    };

    const user = await this.create(userData);
    return _.omit(user.toObject(), ['password']);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getUser(
  this: mongoose.Model<IUserDocument>,
  id: string,
): Promise<Omit<IUserDocument, 'password'>> {
  try {
    const user = await this.findById(id).lean();

    if (!user) {
      throw new AppError('User not found', ERROR_ENUM.RESOURCE_NOT_FOUND);
    }

    return _.omit(user, ['password']);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to retrieve user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}
