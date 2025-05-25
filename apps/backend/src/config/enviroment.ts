import dotenv from 'dotenv'

dotenv.config()

export type NODE_ENV_VALUES = 'development' | 'staging' | 'production'

export interface Enviroment {
  port: number
  nodeEnv: NODE_ENV_VALUES
  databaseURL: string
}

const enviroment: Enviroment = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: (process.env.NODE_ENV as NODE_ENV_VALUES) || 'development',
  databaseURL: String(process.env.DATABASE_URL),
}

export default enviroment
