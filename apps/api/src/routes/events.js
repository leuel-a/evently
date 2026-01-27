import {Router} from 'express';
import {
    createEventValidator,
    getEventsValidator,
    getEventValidator,
    updateEventValidator,
    deleteEventValidator,
} from '../validators/events.js';
import {
    createEventHandler,
    getEventHandler,
    getEventsHandler,
    updateEventHandler,
    deleteEventHandler,
} from '../handlers/events.js';
import {validateRequest} from '../middlewares/validateRequest.js';

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

const router = Router();

router.post(BASE_URL, createEventValidator, validateRequest, createEventHandler);
router.get(BASE_URL_WITH_ID, getEventValidator, validateRequest, getEventHandler);
router.get(BASE_URL, getEventsValidator, validateRequest, getEventsHandler);
router.put(BASE_URL_WITH_ID, updateEventValidator, validateRequest, updateEventHandler);
router.delete(BASE_URL_WITH_ID, deleteEventValidator, validateRequest, deleteEventHandler);

export default router;
