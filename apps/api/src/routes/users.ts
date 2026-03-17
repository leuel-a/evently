import {Router} from 'express';
import {API_ROUTES} from '../config';
import {getAuthenticatedUser, getLinkedAccountsHandler} from '../handlers/users';
import {requireUser} from '../middlewares/requireUser';

const router = Router();

router.get(API_ROUTES.users.linkedAccounts, requireUser, getLinkedAccountsHandler);
router.get(API_ROUTES.users.me, requireUser, getAuthenticatedUser);

export default router;
