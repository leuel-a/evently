import { Router } from 'express';
import { createUserHandler } from '@/handlers/users.handlers';
import { createUserValidator } from '@/validators/users.validators';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();

router.post('/', createUserValidator, validateRequest, createUserHandler);

export default router;
