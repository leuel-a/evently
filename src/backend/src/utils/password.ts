import bcrypt from 'bcrypt';
import enviroment from '@/config/enviroment';
import { AppError, ERROR_ENUM } from '@/models/AppError';

export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = await bcrypt.genSalt(enviroment.saltRounds);
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new AppError('Failed to hash password', ERROR_ENUM.INTERNAL_SERVER_ERROR);
  }
}

export async function validatePassword(candidate: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidate, hash);
  } catch (error) {
    throw new AppError("Passwords don't match, Try Again.", ERROR_ENUM.PASSWORD_DONT_MATCH);
  }
}
