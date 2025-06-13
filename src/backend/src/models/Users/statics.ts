import { AppError, ERROR_ENUM } from '@/models/AppError';
import { hashPassword } from '@/utils/password';
import type { ICreateUser, IUserDocument, IUserModel } from './types';

export async function createUser(
  this: IUserModel,
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
    return user.toObject(); // convert the response user document to a js object
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to create user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getUser(
  this: IUserModel,
  id: string,
): Promise<Omit<IUserDocument, 'password'>> {
  try {
    const user = await this.findById(id);

    if (!user) {
      throw new AppError('User not found', ERROR_ENUM.RESOURCE_NOT_FOUND);
    }

    return user.toObject();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to retrieve user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserByEmail(this: IUserModel, email: string) {
  try {
    const user = await this.findOne({ email }).lean();
    return user;
  } catch (error) {
    throw new AppError('Failed to retrieve user', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}
