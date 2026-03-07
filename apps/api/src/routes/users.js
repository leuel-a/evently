import {Router} from 'express';
import {API_ROUTES} from '../config.js';
import {getLinkedAccountsHandler} from '../handlers/users.js';
import {requireUser} from '../middlewares/requireUser.js';

const router = Router();

router.get(API_ROUTES.users.linkedAccounts, requireUser, getLinkedAccountsHandler);

export default router;
