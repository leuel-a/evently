import { cleanEnv, str, num } from 'envalid';

const env = cleanEnv(process.env, {
    CHAPA_BASE_API_URL: str(),
    CHAPA_SECRET_KEY: str(),
    NODE_PORT: num(),
});

export { env };
