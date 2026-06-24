import express from 'express';
import {getEventsHandler} from '../handlers/events';
import {getEventsValidator} from '../validators/events';
import {validateRequest} from '../middlewares/validateRequest';

const router: express.Router = express.Router();

const BASE_URL = '';

router.get(BASE_URL, getEventsValidator, validateRequest, getEventsHandler);

export default router;
