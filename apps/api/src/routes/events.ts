import express from 'express';
import {getEventsHandler, getEventHandler} from '../handlers/events';
import {getEventsValidator, getEventValidator} from '../validators/events';
import {validateRequest} from '../middlewares/validateRequest';

const router: express.Router = express.Router();

const BASE_URL = '';
const BASE_URL_ID = '/:id'

router.get(BASE_URL, getEventsValidator, validateRequest, getEventsHandler);
router.get(BASE_URL_ID, getEventValidator, validateRequest, getEventHandler);

export default router;
