import {Router} from 'express';
import {
  createEventTypeHandler,
  getEventTypeHandler,
  getEventTypesHandler,
} from '@/handlers/eventTypes.handlers';
import {validateRequest} from '@/middlewares/validateRequest';
import {createEventTypeValidator, getEventTypeValidator} from '@/validators/eventTypes.validators';

const router = Router();

router.post('/', createEventTypeValidator, validateRequest, createEventTypeHandler);
router.get('/:id', getEventTypeValidator, validateRequest, getEventTypeHandler);
router.get('/', getEventTypesHandler);

export default router;
