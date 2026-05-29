import './env';

import {logger} from './utils/logger';
import { createApp } from './app.factory';

const PORT = process.env.PORT;

async function startServer() {
    try {
        const app = await createApp();
        app.listen(PORT, async () => {
            logger.info(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
