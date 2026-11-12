import './env';

import { env } from './config/env';
import { logger } from './utils/logger';
import { createApp } from './app.factory';
import '@evently/models/users';

async function startServer() {
    try {
        const app = await createApp();
        app.listen(env.NODE_PORT, async () => {
            logger.info(
                `🚀 Server running at http://localhost:${env.NODE_PORT}`,
            );
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
