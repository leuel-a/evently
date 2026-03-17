import express from 'express';
import {
    createEventCategoryValidator,
    getEventCategoriesValidator,
    getEventCategoryValidator,
    deleteEventCategoryValidator,
} from '../validators/eventsCategory.js';
import {validateRequest} from '../middlewares/validateRequest.js';
import {
    createEventCategoryHandler,
    getEventCategoriesHandler,
    getEventCategoryHandler,
    deleteEventHandler,
} from '../handlers/eventsCategory.js';

const router = express.Router();

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

router.get(BASE_URL, getEventCategoriesValidator, validateRequest, getEventCategoriesHandler);
router.get(BASE_URL_WITH_ID, getEventCategoryValidator, validateRequest, getEventCategoryHandler);
router.post(BASE_URL, createEventCategoryValidator, validateRequest, createEventCategoryHandler);
router.delete(BASE_URL_WITH_ID, deleteEventCategoryValidator, validateRequest, deleteEventHandler);

export default router;
