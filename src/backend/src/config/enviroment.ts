export type NODE_ENV_VALUES = 'development' | 'staging' | 'production';

export interface Enviroment {
  port: number;
  nodeEnv: NODE_ENV_VALUES;
  saltRounds: number;
  databaseURL: string;
  jwtSecret: string;
}

const enviroment: Enviroment = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: (process.env.NODE_ENV as NODE_ENV_VALUES) || 'development',
  saltRounds: Number(process.env.SALT_ROUNDS),
  databaseURL: String(process.env.DATABASE_URL),
  jwtSecret: String(process.env.JWT_SECRET),
};

export default enviroment;
