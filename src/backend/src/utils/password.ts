import bcrypt from 'bcrypt';
import enviroment from '@/config/enviroment';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = await bcrypt.genSalt(enviroment.saltRounds);
  return await bcrypt.hash(password, saltRounds);
}

export async function validatePassword(candidate: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(candidate, hash);
}
