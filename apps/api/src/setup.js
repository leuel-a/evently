import cors from 'cors';
import {format} from 'date-fns';
import express from 'express';
import morgan from 'morgan';
import {toNodeHandler} from 'better-auth/node';
import {createAuth} from './lib/auth.js';
import {logger} from './utils/logger.js';
import MongoClient from './lib/mongo-client.js';
import {API_ROUTES, API_PREFIX} from './config.js';
import eventsRoutes from './routes/events.js';
import usersRoutes from './routes/organizers.js';
import eventsCategoryRoutes from './routes/eventsCategory.js';
import {errorHandler} from './middlewares/errorHandler.js';

export const WEB_URL = process.env.WEB_URL;
export const db = new MongoClient();

/**
 * Setup Express instance
 * @param {import('express').Express} app
 */
export async function setup(app) {
    try {
        await db.connect();

        const auth = createAuth(db.getDb(), db.getNativeClient());

        // Setup Logging Requests with Morgan
        morgan.token('timestamp', () => format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        app.use(morgan(':timestamp [http] :method :url :status - :response-time ms'));

        app.all(`${API_PREFIX}${API_ROUTES.auth.base}/*splat`, toNodeHandler(auth));

        app.get(`${API_PREFIX}/healthcheck`, (_req, res) => {
            res.json({
                db: Boolean(db.connection),
            });
        });

        // Mount express json middleware after Better Auth handler
        // or only apply it to routes that don't interact with better auth
        app.use(express.json());

        app.use(`${API_PREFIX}${API_ROUTES.users.base}`, usersRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.events.base}`, eventsRoutes);
        app.use(`${API_PREFIX}${API_ROUTES.eventsCategory.base}`, eventsCategoryRoutes)

        // Mount the error handler
        app.use(errorHandler);

        // Setup CORS Middleware
        app.use(
            cors({
                origin: WEB_URL,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true,
            }),
        );
    } catch (error) {
        logger.error(`Something went wrong while trying to setup application ${error}`);
        process.exit(1);
    }
}
