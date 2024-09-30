import { cleanEnv, str, num } from 'envalid'

const env = cleanEnv(process.env, {
  POSTGRES_USER: str(),
  POSTGRES_DATABASE: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_HOST: str(),
  POSTGRES_URL_NO_SSL: str(),
  POSTGRES_URL: str(),
  POSTGRES_URL_NON_POOLING: str(),
  POSTGRES_PRISMA_URL: str(),
  AUTH_SECRET: str(),
  AUTH_GOOGLE_ID: str(),
  AUTH_GOOGLE_SECRET: str(),
  SALT_ROUNDS: num(),
})

export default env
