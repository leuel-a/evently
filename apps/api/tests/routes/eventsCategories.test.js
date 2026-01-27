import '../../src/env.js';
import request from 'supertest';
import {expect, describe, test, beforeAll, beforeEach, afterEach} from 'vitest';
import EventsCategory from '../../src/models/eventsCategory/index.js';
import {createApp} from '../../src/app.factory.js';
import {API_ROUTES, API_PREFIX} from '../../src/config.js';

/** @type {import('express').Express} */
let app;

/** @type {import('mongoose').Document} */
let testEventCategory;

const BASE_URL = `${API_PREFIX}${API_ROUTES.eventsCategory.base}`;

const testEventCategoryPayload = {
    name: 'Ethiopian Culture Bazar',
    description: 'Events focused on software, hardware, AI, startups, and emerging technologies.',
};

beforeAll(async () => {
    app = await createApp();
});

beforeEach(async () => {
    testEventCategory = await EventsCategory.createEventCategory(testEventCategoryPayload);
});

afterEach(async () => {
    await EventsCategory.deleteOne({_id: testEventCategory._id});
});

describe('/eventsCategory API', () => {
    test('[GET] /eventsCategory - returns paginated events', async () => {
        const response = await request(app).get(BASE_URL);

        expect(response?.status).toBe(200);
        expect(response.body).toMatchObject({
            data: expect.any(Array),
            page: expect.any(Number),
            limit: expect.any(Number),
        });

        expect(response?.body?.data?.length).toBeGreaterThanOrEqual(1);
        expect(response?.body?.page).toBe(1);
    });

    test('[GET] /eventsCategory/:id - get an event category based on its id', async () => {
        const res = await request(app).get(`${BASE_URL}/${testEventCategory._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');

        expect(res?.body?.data).toMatchObject({
            _id: testEventCategory?._id.toString(),
            name: testEventCategory?.name,
            description: testEventCategory?.description,
        });
    });
});
