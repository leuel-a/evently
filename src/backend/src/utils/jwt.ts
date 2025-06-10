import jwt from 'jsonwebtoken';
import enviroment from '@/config/enviroment';
import { logger } from '@/utils/logger';

export interface JwtPayload {
  id: string;
  email: string;
}

export function signJwt(payload: JwtPayload, options?: jwt.SignOptions): string {
  return jwt.sign(payload, enviroment.jwtSecret, {
    ...(options && options),
    algorithm: 'HS256',
  });
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, enviroment.jwtSecret) as JwtPayload;
  } catch (error) {
    logger.error('JWT verification failed:', error);
    return null;
  }
}
