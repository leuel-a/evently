import { Router } from 'express';
import { createUserHandler, getUserHandler, getUsersHandler } from '@/handlers/users.handlers';
import { createUserValidator, getUserValidator } from '@/validators/users.validators';
import { validateRequest } from '@/middlewares/validateRequest';

const router = Router();

router.post('/', createUserValidator, validateRequest, createUserHandler);
router.get('/:id', getUserValidator, validateRequest, getUserHandler);
router.get('/', getUsersHandler)

export default router;
