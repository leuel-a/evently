const INDEX_BASE_ROUTE = '';
const DASHBOARD_BASE_ROUTE = '/dashboard';
const AUTH_PAGE_BASE_ROUTE = '';

const APP_ROUTES = {
    base: `/${INDEX_BASE_ROUTE}`,
    events: {
        base: `${INDEX_BASE_ROUTE}/events`,
    },
    auth: {
        base: AUTH_PAGE_BASE_ROUTE,
        login: `${AUTH_PAGE_BASE_ROUTE}/login`,
        signup: `${AUTH_PAGE_BASE_ROUTE}/signup`,
    },
    dashboard: {
        base: DASHBOARD_BASE_ROUTE,
        events: {
            base: `${DASHBOARD_BASE_ROUTE}\/events`,
            create: `${DASHBOARD_BASE_ROUTE}\/events\create`,
            update: `${DASHBOARD_BASE_ROUTE}\/events\/update\{id}`,
        },
        settings: {
            base: `${DASHBOARD_BASE_ROUTE}/settings`, // TODO: this route does not exists
            accounts: `${DASHBOARD_BASE_ROUTE}/settings/accounts`,
        },
    },
} as const;

type AppRoutes = typeof APP_ROUTES;

const INDEX_BASE_API_ROUTE = '/api';
const USERS_API_BASE_ROUTE = `${INDEX_BASE_API_ROUTE}/users`
const AUTH_API_BASE_ROUTE = `${INDEX_BASE_API_ROUTE}/auth`;
const EVENTS_API_BASE_ROUTE = `${INDEX_BASE_API_ROUTE}/events`;
const EVENT_API_CATEGORIES_BASE_ROUTE = `${INDEX_BASE_API_ROUTE}/eventsCategory`;
const SETTINGS_BASE_ROUTE = `${INDEX_BASE_API_ROUTE}/settings`;

const API_ROUTES = {
    index: INDEX_BASE_API_ROUTE, // this might never be needed
    auth: {
        base: AUTH_API_BASE_ROUTE,
        me: {
            base: `${AUTH_API_BASE_ROUTE}/me`,
            linkedAccounts: `${AUTH_API_BASE_ROUTE}/me/linked-accounts`,
        },
    },
    users: {
        base: USERS_API_BASE_ROUTE,
        linkedAccounts: `${USERS_API_BASE_ROUTE}/me/linked-accounts`
    },
    events: {base: EVENTS_API_BASE_ROUTE},
    eventCategory: {base: EVENT_API_CATEGORIES_BASE_ROUTE},
    settings: {base: SETTINGS_BASE_ROUTE},
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
