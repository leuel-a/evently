import express from 'express';
import {getSettingsHandler} from '../handlers/settings.js';

const router = express.Router();

const BASE_URL = '';

router.get(BASE_URL, getSettingsHandler);

export default router;
