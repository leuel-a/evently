export const API_PREFIX = '/api';

export const API_ROUTES = Object.freeze({
    auth: {base: '/auth'},
    users: {
        base: '/users',
        me: '/me',
        linkedAccounts: '/me/linked-accounts',
    },
    public: {
        events: {base: '/events'},
    },
    dashboard: {
        stats: {base: '/dashboard/stats', dashboard: '/stats/dashboard'},
        events: {base: '/dashboard/events'},
        eventsCategory: {base: '/dashboard/eventsCategory'},
        tickets: {base: '/dashboard/tickets'},
        settings: {base: '/dashboard/settings'},
    },
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
