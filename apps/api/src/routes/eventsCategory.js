import express from 'express';
import {
    getEventCategoriesValidator,
    getEventCategoryValidator,
} from '../validators/eventsCategory.js';
import {validateRequest} from '../middlewares/validateRequest.js';
import {getEventCategoriesHandler, getEventCategoryHandler} from '../handlers/eventsCategory.js';

const router = express.Router();

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

router.get(BASE_URL, getEventCategoriesValidator, validateRequest, getEventCategoriesHandler);
router.get(BASE_URL_WITH_ID, getEventCategoryValidator, validateRequest, getEventCategoryHandler);

export default router;
