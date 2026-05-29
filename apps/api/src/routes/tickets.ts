import express from 'express';
import {getTicketsValidator} from '../validators/tickets';
import {requireUser} from '../middlewares/requireUser';
import {getTicketsHandler} from '../handlers/tickets';

const BASE_URL = '';
// const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

const router: express.Router = express.Router();

router.get(BASE_URL, requireUser, getTicketsValidator, getTicketsHandler);

export default router;
