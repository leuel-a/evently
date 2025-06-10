import { Router } from 'express';
import { createEventHandler, getEventHandler } from '@/handlers/events.handlers';
import { requireAuth } from '@/middlewares/requireAuth';
import { validateRequest } from '@/middlewares/validateRequest';
import { createEventValidator } from '@/validators/events.validator';

const router = Router();

router.post('/', requireAuth, createEventValidator, validateRequest, createEventHandler);
router.get('/:id', getEventHandler);

export default router;
