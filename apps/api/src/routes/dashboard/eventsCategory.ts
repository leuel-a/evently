import express from 'express';
import {
    createEventCategoryValidator,
    getEventCategoriesValidator,
    getEventCategoryValidator,
    deleteEventCategoryValidator,
} from '../../validators/eventsCategory';
import {validateRequest} from '../../middlewares/validateRequest';
import {requireUser} from '../../middlewares/requireUser';
import {
    createEventCategoryHandler,
    getEventCategoriesHandler,
    getEventCategoryHandler,
    deleteEventHandler,
} from '../../handlers/dashboard/eventsCategory';

const router: express.Router = express.Router();

const BASE_URL = '';
const BASE_URL_WITH_ID = `${BASE_URL}/:id`;

router.get(
    BASE_URL,
    requireUser,
    getEventCategoriesValidator,
    validateRequest,
    getEventCategoriesHandler,
);
router.get(
    BASE_URL_WITH_ID,
    requireUser,
    getEventCategoryValidator,
    validateRequest,
    getEventCategoryHandler,
);
router.post(
    BASE_URL,
    requireUser,
    createEventCategoryValidator,
    validateRequest,
    createEventCategoryHandler,
);
router.delete(
    BASE_URL_WITH_ID,
    requireUser,
    deleteEventCategoryValidator,
    validateRequest,
    deleteEventHandler,
);

export default router;
