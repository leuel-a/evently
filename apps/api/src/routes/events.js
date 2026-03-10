import express from 'express';
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
import {requireUser} from '../middlewares/requireUser.js';
import {validateRequest} from '../middlewares/validateRequest.js';

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

const router = express.Router();

router.post(BASE_URL, requireUser, createEventValidator, validateRequest, createEventHandler);
router.get(BASE_URL_WITH_ID, requireUser, getEventValidator, validateRequest, getEventHandler);
router.get(BASE_URL, requireUser, getEventsValidator, validateRequest, getEventsHandler);
router.put(BASE_URL_WITH_ID, requireUser, updateEventValidator, validateRequest, updateEventHandler);
router.delete(BASE_URL_WITH_ID, requireUser, deleteEventValidator, validateRequest, deleteEventHandler);

export default router;
