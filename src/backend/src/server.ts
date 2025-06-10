require('dotenv').config();

import 'tsconfig-paths/register';
import { connectDB } from '@/config/database';
import enviroment from '@/config/enviroment';
import app from '@/config/express';
import { logger } from '@/utils/logger';

app.listen(enviroment.port, async () => {
  await connectDB();

  logger.info(`Successfully connected to MongoDB, URL: ${enviroment.databaseURL}`);
  logger.info(`Server is running on PORT: ${enviroment.port}`);
});
