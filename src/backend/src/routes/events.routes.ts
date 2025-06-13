import { Router } from 'express';
import {
  createEventHandler,
  getEventHandler,
  getEventsHandler,
  updateEventHandler,
} from '@/handlers/events.handlers';
import { requireAuth } from '@/middlewares/requireAuth';
import { validateRequest } from '@/middlewares/validateRequest';
import {
  createEventValidator,
  getEventValidator,
  updateEventValidator,
} from '@/validators/events.validator';

const router = Router();

router.post('/', requireAuth, createEventValidator, validateRequest, createEventHandler);
router.get('/', getEventsHandler);
router.get('/:id', getEventValidator, validateRequest, getEventHandler);
router.put('/:id', requireAuth, updateEventValidator, validateRequest, updateEventHandler);

export default router;
