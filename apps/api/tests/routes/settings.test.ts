import '../../src/env.js';

import request from 'supertest';
import httpStatus from 'http-status';
import {beforeAll, describe, test, expect} from 'vitest';
import {createApp} from '../../src/app.factory.js';
import {API_ROUTES, API_PREFIX} from '../../src/config.js';

/** @type {import('express').Express} */
let app;

const BASE_URL = `${API_PREFIX}${API_ROUTES.settings.base}`;

beforeAll(async () => {
    app = await createApp();
});

describe('/settings API', () => {
    test('[GET] /settings - get settings', async () => {
        const response = await request(app).get(BASE_URL);

        expect(response.status).toBe(httpStatus.OK);

        expect(response.body).toHaveProperty('resources');
        expect(response.body).toHaveProperty('category');

        expect(Array.isArray(response?.body?.resources)).toBe(true);
        expect(Array.isArray(response?.body?.category?.all)).toBe(true);
        expect(Array.isArray(response?.body?.category?.active)).toBe(true);
    });
});
