import { Router } from 'express';
import passport from 'passport';
import { loginHandler } from '@/handlers/auth.handlers';
import { validateRequest } from '@/middlewares/validateRequest';
import { loginValidator } from '@/validators/auth.validators';

const router = Router();

router.post(
  '/login',
  loginValidator,
  validateRequest,
  passport.authenticate('local', { session: false }),
  loginHandler,
);

export default router;
