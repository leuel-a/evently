import { Router } from 'express';
import { requireAuth } from '@/middlewares/requireAuth';

const router = Router();

router.post('/events', requireAuth);

export default router;
