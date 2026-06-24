const DASHBOARD_BASE_ROUTE = '/dashboard';

const APP_ROUTES = {
    events: {base: '/events'},
    auth: {login: '/login', signup: '/signup'},
    dashboard: {
        base: DASHBOARD_BASE_ROUTE,
        events: {
            base: '/dashboard/events',
            create: '/dashboard/events/create',
            edit: '/dashboard/events/edit',
        },
        eventsCategory: {base: '/dashboard/events-category'},
        tickets: {base: '/dashboard/tickets'},
        settings: {
            base: '/dashboard/settings',
            general: '/dashboard/settings/general',
            accounts: '/dashboard/settings/accounts',
        },
    },
} as const;
type AppRoutes = typeof APP_ROUTES;

const API_ROUTES = {
    users: {
        base: '/users',
        me: '/users/me',
        linkedAccounts: '/users/me/linked-accounts',
    },
    public: {
        events: {base: '/events'}
    },
    dashboard: {
        // FIXME: this is weird
        stats: {dashboard: '/dashboard/stats/dashboard'},
        auth: {
            me: {
                base: '/auth/me', // TODO: this might not be needed
                linkedAccounts: '/auth/me/linked-accounts',
            },
        },
        tickets: {base: '/dashboard/tickets'},
        events: {base: '/dashboard/events'},
        eventCategory: {base: '/dashboard/eventsCategory'},
        settings: {base: '/dashboard/settings'},
    },
} as const;

type ApiRoutes = typeof API_ROUTES;

const HTTP_METHODS = {
    POST: 'POST',
    GET: 'GET',
    DELETE: 'DELETE',
    PUT: 'PUT',
} as const;

type HttpMethods = typeof HTTP_METHODS;

export {APP_ROUTES, API_ROUTES, HTTP_METHODS};
export type {AppRoutes, ApiRoutes, HttpMethods};
