import 'tsconfig-paths/register';

import { app } from '@/app';
import { logger } from '@/utils/logger';
import { connectDB } from '@/config/database';
import enviroment from '@/config/enviroment';

app.listen(enviroment.port, async () => {
  await connectDB();

  logger.info(`Successfully connected to MongoDB, URL: ${enviroment.databaseURL}`);
  logger.info(`Server is running on PORT: ${enviroment.port}`);
});
