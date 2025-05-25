import mongoose from 'mongoose'
import { logger } from '@/utils/logger'
import enviroment from '@/config/enviroment'

export async function connectDB() {
  try {
    await mongoose.connect(enviroment.databaseURL)
  } catch (error) {
    // TODO: handle errors gracefully
    logger.error(`Error: unable to connect to database \n ${error}`)
    process.exit(1)
  }
}
