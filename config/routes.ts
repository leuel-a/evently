const INDEX_BASE_ROUTE = '/';
const DASHBOARD_BASE_ROUTE = '/dashboard';

const APP_ROUTES = {
    index: {
        base: INDEX_BASE_ROUTE,
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

export {APP_ROUTES};
export type {AppRoutes};
