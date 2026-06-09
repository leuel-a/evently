import express from 'express';
import {getSettingsHandler} from '../handlers/settings';
import {requireUser} from '../middlewares/requireUser';

const router: express.Router = express.Router();
const BASE_URL = '';

router.get(BASE_URL, requireUser, getSettingsHandler);

export default router;
