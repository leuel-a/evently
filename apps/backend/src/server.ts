import 'tsconfig-paths/register'

import app from '@/app'
import { logger } from '@/utils/logger'
import { connectDB } from '@/config/database'
import enviroment from '@/config/enviroment'

app.listen(enviroment.port, async () => {
  await connectDB()

  // TODO: use a logger instead of the Console to create logs
  logger.info(`Server is running on PORT: ${enviroment.port}`)
})
