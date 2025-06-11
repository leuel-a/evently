import { Router } from 'express';
import { createEventHandler, getEventHandler, getEventsHandler } from '@/handlers/events.handlers';
import { requireAuth } from '@/middlewares/requireAuth';
import { validateRequest } from '@/middlewares/validateRequest';
import { createEventValidator, getEventValidator } from '@/validators/events.validator';

const router = Router();

router.post('/', requireAuth, createEventValidator, validateRequest, createEventHandler);
router.get('/', getEventsHandler);
router.get('/:id', getEventValidator, validateRequest, getEventHandler);

export default router;
