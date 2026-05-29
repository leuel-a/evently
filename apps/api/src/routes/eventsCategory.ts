import express from 'express';
import {
    createEventCategoryValidator,
    getEventCategoriesValidator,
    getEventCategoryValidator,
    deleteEventCategoryValidator,
} from '../validators/eventsCategory';
import {validateRequest} from '../middlewares/validateRequest';
import {
    createEventCategoryHandler,
    getEventCategoriesHandler,
    getEventCategoryHandler,
    deleteEventHandler,
} from '../handlers/eventsCategory';

const router: express.Router = express.Router();

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

router.get(BASE_URL, getEventCategoriesValidator, validateRequest, getEventCategoriesHandler);
router.get(BASE_URL_WITH_ID, getEventCategoryValidator, validateRequest, getEventCategoryHandler);
router.post(BASE_URL, createEventCategoryValidator, validateRequest, createEventCategoryHandler);
router.delete(BASE_URL_WITH_ID, deleteEventCategoryValidator, validateRequest, deleteEventHandler);

export default router;
