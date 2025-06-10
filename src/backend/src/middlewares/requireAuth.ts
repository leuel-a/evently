import { RequestHandler } from 'express';
import passport from 'passport';

export const requireAuth: RequestHandler = passport.authenticate('jwt', { session: false });
