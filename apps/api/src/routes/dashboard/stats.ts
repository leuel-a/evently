import express from 'express';
import {requireUser} from '../../middlewares/requireUser';
import {getDashboardStatsHandler} from '../../handlers/dashboard/stats';

const router: express.Router = express.Router();
const BASE_URL = '';

router.get(`${BASE_URL}`, requireUser, getDashboardStatsHandler);

export default router;
