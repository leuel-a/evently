import express from 'express';
import {getTicketsValidator} from '../validators/tickets.js';
import {requireUser} from '../middlewares/requireUser.js';
import {getTicketsHandler} from '../handlers/tickets.js';

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`

const router = express.Router();

router.get(BASE_URL, requireUser, getTicketsValidator, getTicketsHandler);

export default router;
