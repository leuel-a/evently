export const API_ROUTES = {
  AUTH: {LOGIN: '/auth/login'},
  EVENTS: {
    LIST: '/events',
    CREATE: '/events',
    DETAIL: (id: string) => `/events/${id}`,
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
    SEARCH: '/events/search',
  },
} as const;
