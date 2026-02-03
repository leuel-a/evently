import '../../src/env.js';

import request from 'supertest';
import {addDays} from 'date-fns';
import httpStatus from 'http-status';
import lodashGet from 'lodash/get.js';
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
    capacity: 100,
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
    testEventPayload.category = testCategory.id;
    testEvent = await EventsModel.createEvent(testEventPayload);
});

afterEach(async () => {
    await EventsModel.deleteOne({_id: testEvent.id});
    await EventCategoryModel.deleteOne({_id: testCategory.id});
});

describe('/events API', () => {
    test('[POST] /events - create a new event', async () => {
        const createNewEventTestPayload = {
            title: 'AI & Cloud Expo 2026',
            description: 'A hands-on conference focused on AI, cloud infrastructure, and DevOps.',
            date: addDays(new Date(), 3).toISOString(),
            location: 'Moscone Center, San Francisco',
            address: '747 Howard St, San Francisco, CA',
            ticketPrice: 0,
            capacity: 500,
            checkoutLink: '',
            virtualUrl: 'https://live.example.com/ai-cloud-expo',
            startTime: '10:00',
            endTime: '18:00',
            type: 'hybrid',
            category: testCategory?.id,
        };

        const response = await request(app)
            .post(BASE_URL)
            .set('Content-Type', 'application/json')
            .send(createNewEventTestPayload);

        expect(response.status).toBe(httpStatus.CREATED);

        const data = lodashGet(response.body, 'data');

        // TODO: this does not seem like a good way to do this
        await EventsModel.deleteOne({_id: data.id});
    });

    test('[GET] /events - returns paginated events', async () => {
        const res = await request(app).get(BASE_URL);

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body).toMatchObject({
            data: expect.any(Array),
            page: expect.any(Number),
            limit: expect.any(Number),
        });

        expect(res.body?.data?.length).toBeGreaterThanOrEqual(1);
        expect(res.body?.page).toBe(1);

        const data = lodashGet(res.body, 'data');

        expect(data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: testEvent.id,
                    title: testEvent.title,
                    description: testEvent.description,
                    date: testEvent.date.toISOString(),
                    location: testEvent.location,
                    ticketPrice: testEvent.ticketPrice,
                    capacity: testEvent.capacity,
                    status: testEvent.status,
                    type: testEvent.type,
                    category: {
                        id: testCategory.id,
                        name: testCategory.name,
                        description: testCategory.description,
                    },
                    virtualUrl: testEvent.virtualUrl,
                    isVirtual: testEvent.isVirtual,
                    isFree: testEvent.isFree,
                    address: testEvent.address,
                    startTime: testEvent.startTime,
                    endTime: testEvent.endTime,
                }),
            ]),
        );
    });

    test('[GET] /events/:id - returns a single event', async () => {
        const res = await request(app).get(`${BASE_URL}/${testEvent.id}`);

        expect(res.status).toBe(httpStatus.OK);
        expect(res.body).toHaveProperty('data');

        expect(res.body.data).toMatchObject({
                    id: testEvent.id,
                    title: testEvent.title,
                    description: testEvent.description,
                    date: testEvent.date.toISOString(),
                    location: testEvent.location,
                    ticketPrice: testEvent.ticketPrice,
                    capacity: testEvent.capacity,
                    status: testEvent.status,
                    type: testEvent.type,
                    virtualUrl: testEvent.virtualUrl,
                    isVirtual: testEvent.isVirtual,
                    isFree: testEvent.isFree,
                    address: testEvent.address,
                    startTime: testEvent.startTime,
                    endTime: testEvent.endTime,
        });
    });

    test('[GET] /events/:id - returns 404 for invalid id', async () => {
        const response = await request(app).get(`${BASE_URL}/507f1f77bcf86cd799439012`);
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    test('[PUT] /events/:id - partially updates an event', async () => {
        const updatedTitle = 'Modern Tech Summit 2027';
        const response = await request(app)
            .put(`${BASE_URL}/${testEvent.id}`)
            .send({title: updatedTitle});

        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toMatchObject({
            id: testEvent.id,
            title: updatedTitle,
        });

        // Ensure unchanged fields remain intact
        expect(response.body.description).toBe(testEventPayload.description);
        expect(response.body.startTime).toBe(testEventPayload.startTime);
        expect(response.body.endTime).toBe(testEventPayload.endTime);
        // expect(response.body.category.id).toBe(testCategory.id);
    });

    test('[PUT] /events/:id - fails with invalid payload', async () => {
        const res = await request(app).put(`${BASE_URL}/${testEvent.id}`).send({title: 123});

        expect(res.status).toBe(httpStatus.BAD_REQUEST);
        expect(res.body).toHaveProperty('errors');
    });
});
