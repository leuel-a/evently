import cors from 'cors';
import {format} from 'date-fns';
import express from 'express';
import morgan from 'morgan';
import {toNodeHandler} from 'better-auth/node';
import {getAuth, initAuth} from './lib/auth';
import {initLLM} from './lib/ai/provider';
import {logger} from './utils/logger';
import MongoClient from './lib/mongo-client';
import {API_ROUTES, API_PREFIX} from './config';
import eventsRoutes from './routes/dashboard/events';
import usersRoutes from './routes/users';
import ticketsRoutes from './routes/dashboard/tickets';
import settingsRoutes from './routes/dashboard/settings';
import statsRoutes from './routes/dashboard/stats';
import eventsCategoryRoutes from './routes/dashboard/eventsCategory';
import publicEventsRoutes from './routes/events';
import {errorHandler} from './middlewares/errorHandler';

export const MORGAN_FORMAT = ':timestamp [http] :method :url :status - :response-time ms';
export const db = new MongoClient();

export async function setup(app: express.Express) {
    try {
        await db.connect();
        initAuth(db);
        await initLLM();

        const auth = getAuth();

        // Setup CORS Middleware
        app.use(
            cors({
                origin: process.env.WEB_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true,
            }),
        );

        // Setup Logging Requests with Morgan
        morgan.token('timestamp', () => format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        app.use(morgan(MORGAN_FORMAT));

        app.all(`${API_PREFIX}${API_ROUTES.auth.base}/*splat`, toNodeHandler(auth));

        app.get(`${API_PREFIX}/healthcheck`, (_req, res) => {
            res.json({
                db: Boolean(db.connection),
            });
        });

        // Mount express json middleware after Better Auth handler
        // or only apply it to routes that don't interact with better auth
        app.use(express.json());

        // PUBLIC ROUTES
        app.use(`${API_PREFIX}${API_ROUTES.users.base}`, usersRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.public.events.base}`, publicEventsRoutes);

        // DASHBOARD ROUTES
        app.use(`${API_PREFIX}${API_ROUTES.dashboard.events.base}`, eventsRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.dashboard.tickets.base}`, ticketsRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.dashboard.eventsCategory.base}`, eventsCategoryRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.dashboard.settings.base}`, settingsRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.dashboard.stats.base}`, statsRoutes);

        // Mount the error handler
        app.use(errorHandler);
    } catch (error) {
        logger.error(`Something went wrong while trying to setup application ${error}`);
        process.exit(1);
    }
}
