export const API_PREFIX = '/api';

export const API_ROUTES = Object.freeze({
    users: {base: '/users', me: '/me', linkedAccounts: '/me/linked-accounts'},
    auth: {base: '/auth'},
    stats: {base: '/stats', dashboard: '/stats/dashboard'},
    events: {base: '/events'},
    eventsCategory: {base: '/eventsCategory'},
    tickets: {base: '/tickets'},
    settings: {base: '/settings'},
});

export const modelNames = Object.freeze({
    events: 'events',
    eventsCategory: 'eventsCategory',
    checkout: 'checkout',
    tickets: 'tickets',
    organizers: 'organizers',
    session: 'sessions',
    account: 'accounts',
    verification: 'verification',
    user: 'user',
    resource: 'resource',
});

export const collectionNames = Object.freeze({
    user: 'user',
    session: 'session',
    account: 'account',
    verification: 'verification',
});

export const TIMEZONE = 'Africa/Addis_Ababa';
