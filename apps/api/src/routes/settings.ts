import express from 'express';
import {getSettingsHandler} from '../handlers/settings';

const router: express.Router = express.Router();
const BASE_URL = '';

router.get(BASE_URL, getSettingsHandler);

export default router;
