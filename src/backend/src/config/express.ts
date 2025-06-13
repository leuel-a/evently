import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import routes from '@/config/routes';
import { errorHandler } from '@/middlewares/errorHandler';
import { authRoutes, eventsRoutes, usersRoutes } from '@/routes';
import './passport';

const API_PREFIX = 'api';
const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(passport.initialize()); // Initialize passport middleware

app.use(express.json());

// register the routes for the application
app.get(`/${API_PREFIX}/${routes.TEST_HEALTH}`, (_req: Request, res: Response) => {
  res.json({
    status: 'API is up and running',
    database: true,
    redis: true,
  });
});

app.use(`/${API_PREFIX}/${routes.AUTH}`, authRoutes);
app.use(`/${API_PREFIX}/${routes.EVENTS}`, eventsRoutes);
app.use(`/${API_PREFIX}/${routes.USERS}`, usersRoutes);

app.use(errorHandler);

export default app;
