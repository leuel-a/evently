import express from 'express';
import {requireUser} from '../middlewares/requireUser';
import {getDashboardStatsHandler} from '../handlers/stats';

const router: express.Router = express.Router();
const BASE_URL = '';

router.get(`${BASE_URL}/dashboard`, requireUser, getDashboardStatsHandler);

export default router;
