import '../../src/env.js';

import express from 'express'
import httpStatus from 'http-status';
import request from 'supertest';
import {expect, describe, test, beforeAll, beforeEach, afterEach} from 'vitest';
import EventsCategory from '../../src/models/eventsCategory/index.js';
import {createApp} from '../../src/app.factory.js';
import {API_ROUTES, API_PREFIX} from '../../src/config.js';
import { EventCategoryDocument } from '../../src/models/eventsCategory/schema.js';

let app: express.Express;
let testEventCategory: EventCategoryDocument;

const BASE_URL = `${API_PREFIX}${API_ROUTES.eventsCategory.base}`;

const testEventCategoryPayload = {
    name: 'Ethiopian Culture Bazar',
    description: 'Events focused on software, hardware, AI, startups, and emerging technologies.',
};

// TODO: Fix this is not efficient
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
    test('[POST] /eventsCategory - creates a new event category', async () => {
        const createNewTestEventCategory = {
            name: 'New Test Event Cateogry',
            description: 'Test Event Category Description',
        };

        const response = await request(app)
            .post(BASE_URL)
            .set('Content-Type', 'application/json')
            .send(createNewTestEventCategory);

        expect(response.status).toBe(httpStatus.CREATED);

        // TODO: this does not seem like a good way to do this
        await EventsCategory.deleteOne({_id: response.body.data.id});
    });

    test('[GET] /eventsCategory - returns paginated events categories', async () => {
        const response = await request(app).get(BASE_URL);

        expect(response?.status).toBe(httpStatus.OK);
        expect(response.body).toMatchObject({
            data: expect.any(Array),
            page: expect.any(Number),
            limit: expect.any(Number),
        });

        expect(response?.body?.data?.length).toBeGreaterThanOrEqual(1);
        expect(response?.body?.page).toBe(1);
    });

    test('[GET] /eventsCategory/:id - get an event category based on its id', async () => {
        const res = await request(app).get(`${BASE_URL}/${testEventCategory.id}`);

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body).toHaveProperty('data');

        expect(res?.body?.data).toMatchObject({
            id: testEventCategory.id,
            name: testEventCategory?.name,
            description: testEventCategory?.description,
        });
    });

    test('[DELETE] /eventsCategory/:id - delete an event category', async () => {
        const res = await request(app).delete(`${BASE_URL}/${testEventCategory.id}`);

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body).toHaveProperty('data');

        expect(res?.body?.data).toMatchObject({
            id: testEventCategory.id,
            name: testEventCategory?.name,
            description: testEventCategory?.description,
        });
    });
});
