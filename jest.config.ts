import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const customConfiguration: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default async () => {
    const config = await createJestConfig(customConfiguration)();

    return {
        ...config,
        transformIgnorePatterns: ['/node_modules/(?!(nanostores)/)'],
    };
};
