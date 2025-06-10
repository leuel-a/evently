import { Request, Response } from 'express';
import express from '@/config/express';
import routes from '@/config/routes';
import { errorHandler } from '@/middlewares/errorHandler';
import authRoutes from '@/routes/auth.routes';
import userRoutes from '@/routes/users.routes';

const API_PREFIX = 'api';

express.get(`/${API_PREFIX}/${routes.TEST_HEALTH}`, (_req: Request, res: Response) => {
  res.json({
    status: 'API is up and running',
    database: true,
    redis: true,
  });
});

express.use(`/${API_PREFIX}/${routes.USERS}`, userRoutes);
express.use(`/${API_PREFIX}/${routes.AUTH}`, authRoutes);
express.use(errorHandler);

export { express as app };
