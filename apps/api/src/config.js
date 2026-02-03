export const API_PREFIX = '/api';

export const API_ROUTES = Object.freeze({
    users: {base: '/users'},
    auth: {base: '/auth'},
    events: {base: '/events'},
    eventsCategory: {
        base: '/eventsCategory',
    },
    settings: {base: '/settings'},
});

export const modelNames = Object.freeze({
    events: 'events',
    eventsCategory: 'eventsCategory',
    tickets: 'tickets',
    organizers: 'organizers',
    session: 'sessions',
    account: 'accounts',
    verification: 'verification',
    user: 'users',
    resource: 'resource',
});

export const collectionNames = Object.freeze({
    user: 'user',
    session: 'session',
    account: 'account',
    verification: 'verification',
});
