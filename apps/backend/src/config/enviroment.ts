import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.ENVFILE || '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export type NODE_ENV_VALUES = 'development' | 'staging' | 'production';

export interface Enviroment {
  port: number;
  nodeEnv: NODE_ENV_VALUES;
  saltRounds: number;
  databaseURL: string;
}

const enviroment: Enviroment = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: (process.env.NODE_ENV as NODE_ENV_VALUES) || 'development',
  saltRounds: Number(process.env.SALT_ROUNDS),
  databaseURL: String(process.env.DATABASE_URL),
};

export default enviroment;
