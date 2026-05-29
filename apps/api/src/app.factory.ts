import express from 'express';
import {setup} from './setup';

/**
 * Creates a fully configured Express app (no listen)
 */
export async function createApp(): Promise<express.Express> {
    const app = express();
    await setup(app);
    return app;
}
