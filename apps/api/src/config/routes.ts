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
        payments: {
            base: '/payments',
            chapa: {
                initialize: '/payments/chapa/initialize',
            },
        },
    },
    dashboard: {
        stats: {base: '/dashboard/stats'},
        events: {base: '/dashboard/events'},
        eventsCategory: {base: '/dashboard/eventsCategory'},
        tickets: {base: '/dashboard/tickets'},
        settings: {base: '/dashboard/settings'},
    },
});
