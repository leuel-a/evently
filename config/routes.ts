const INDEX_BASE_ROUTE = '/';
const DASHBOARD_BASE_ROUTE = '/dashboard';
const AUTH_BASE_ROUTE = '/auth';

const APP_ROUTES = {
    index: {
        base: INDEX_BASE_ROUTE,
        home: INDEX_BASE_ROUTE,
    },
    auth: {
        base: AUTH_BASE_ROUTE,
        login: `${AUTH_BASE_ROUTE}/login`,
        signup: `${AUTH_BASE_ROUTE}/signup`,
    },
    dashboard: {
        base: DASHBOARD_BASE_ROUTE,
        events: {
            base: `${DASHBOARD_BASE_ROUTE}\/events`,
            create: `${DASHBOARD_BASE_ROUTE}\/events\create`,
            update: `${DASHBOARD_BASE_ROUTE}\/events\/update\{id}`,
        },
    },
} as const;

type AppRoutes = typeof APP_ROUTES;

const INDEX_BASE_API_ROUTE = '/';
const EVENTS_BASE_ROUTE = '/events';
const EVENT_CATEGORIES_BASE_ROUTE = '/eventCategory';

const API_ROUTES = {
    index: INDEX_BASE_API_ROUTE, // this might never be needed
    events: {
        base: EVENTS_BASE_ROUTE,
    },
    eventCategory: {
        base: EVENT_CATEGORIES_BASE_ROUTE,
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
