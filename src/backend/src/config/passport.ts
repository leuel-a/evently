import createHttpError from 'http-errors';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import type { IVerifyOptions } from 'passport-local';
import enviroment from '@/config/enviroment';
import { HTTP_STATUS } from '@/constants/statusCodes';
import AppError, { ERROR_ENUM } from '@/models/AppError';
import UsersModel from '@/models/Users';
import { logger } from '@/utils/logger';
import { validatePassword } from '@/utils/password';

export type VerifyCallback = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  user?: Express.User | false,
  options?: IVerifyOptions,
) => void;

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email: string, password: string, done: VerifyCallback) => {
      try {
        const user = await UsersModel.getUserByEmail(email);
        const passwordCorrect = await validatePassword(password, user.password);

        if (!passwordCorrect) {
          return done(
            createHttpError(HTTP_STATUS.BAD_REQUEST, ERROR_ENUM.INVALID_EMAIL_OR_PASSWORD),
            false,
          );
        }

        done(null, user);
      } catch (error) {
        if (error instanceof AppError) {
          const message =
            error?.enum === ERROR_ENUM.RESOURCE_NOT_FOUND
              ? ERROR_ENUM.USER_NOT_FOUND
              : (error.message ?? 'An error occurred');

          return done(createHttpError(HTTP_STATUS.BAD_REQUEST, message), false);
        }
        done(
          createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_ENUM.INTERNAL_SERVER_ERROR),
          false,
        );
      }
    },
  ),
);

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: enviroment.jwtSecret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await UsersModel.getUser(jwtPayload.id);
      if (!user) {
        return done(
          createHttpError(HTTP_STATUS.UNAUTHORIZED, ERROR_ENUM.RESOURCE_NOT_FOUND),
          false,
        );
      }
      return done(null, user);
    } catch (error) {
      logger.error('JWT Strategy Error:', error);
      return done(
        createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_ENUM.INTERNAL_SERVER_ERROR),
        false,
      );
    }
  }),
);
