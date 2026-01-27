import '../../src/env.js';
import request from 'supertest';
import {expect, describe, test, beforeAll, beforeEach, afterEach} from 'vitest';
import {createApp} from '../../src/app.factory.js';
import {API_ROUTES, API_PREFIX} from '../../src/config';
import EventsModel from '../../src/models/events/index.js';
import EventCategoryModel from '../../src/models/eventsCategory/index.js';

/** @type {import('express').Express} */
let app;

/** @type {import('mongoose').Document} */
let testEvent;

/** @type {import('mongoose').Document} */
let testCategory;

const BASE_URL = `${API_PREFIX}${API_ROUTES.events.base}`;

const testEventPayload = {
    title: 'Modern Tech Summit 2026',
    description: 'An annual gathering for software engineers and architects.',
    date: '2026-06-15T09:00:00.000Z',
    location: 'Convention Center, New York',
    address: '123 Main St, New York, NY',
    ticketPrice: 129.99,
    capacity: 200,
    checkoutLink: 'https://tickets.example.com/summit',
    virtualUrl: 'https://meet.example.com/summit',
    startTime: '09:00',
    endTime: '17:00',
    type: 'virtual',
};

const testEventCategoryPayload = {
    name: 'Test Category',
    description: 'Temporary category for testing events',
};

beforeAll(async () => {
    app = await createApp();
});

beforeEach(async () => {
    testCategory = await EventCategoryModel.createEventCategory(testEventCategoryPayload);
    testEventPayload.category = testCategory._id;
    testEvent = await EventsModel.createEvent(testEventPayload);
});

afterEach(async () => {
    await EventsModel.deleteOne({_id: testEvent._id});
    await EventCategoryModel.deleteOne({_id: testCategory._id});
});

describe('/events API', () => {
    test('[GET] /events - returns paginated events', async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            data: expect.any(Array),
            page: expect.any(Number),
            limit: expect.any(Number),
        });

        expect(res.body?.data?.length).toBeGreaterThanOrEqual(1);
        expect(res.body?.page).toBe(1);
    });

    test('[GET] /events/:id - returns a single event', async () => {
        const res = await request(app).get(`${BASE_URL}/${testEvent._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');

        expect(res.body.data).toMatchObject({
            _id: testEvent._id.toString(),
            title: testEventPayload.title,
            description: testEventPayload.description,
            category: {
                _id: testCategory._id.toString(),
                name: testCategory.name,
            },
            startTime: testEventPayload.startTime,
            endTime: testEventPayload.endTime,
        });
    });

    test('[GET] /events/:id - returns 404 for invalid id', async () => {
        const response = await request(app).get(`${BASE_URL}/507f1f77bcf86cd799439012`);
        expect(response.status).toBe(404);
    });

    test('[PUT] /events/:id - partially updates an event', async () => {
        const updatedTitle = 'Modern Tech Summit 2027';
        const response = await request(app)
            .put(`${BASE_URL}/${testEvent._id}`)
            .send({title: updatedTitle});

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            _id: testEvent._id.toString(),
            title: updatedTitle,
        });

        // Ensure unchanged fields remain intact
        expect(response.body.description).toBe(testEventPayload.description);
        expect(response.body.startTime).toBe(testEventPayload.startTime);
        expect(response.body.endTime).toBe(testEventPayload.endTime);
        expect(response.body.category._id).toBe(testCategory._id.toString());
    });

    test('[PUT] /events/:id - fails with invalid payload', async () => {
        const res = await request(app).put(`${BASE_URL}/${testEvent._id}`).send({title: 123});

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });
});
