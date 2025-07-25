export const DASHBOARD_PREFIX = 'dashboard';

export const RESOURCE_GROUPS = {
    EVENTS: 'EVENTS',
    PAYMENTS: 'PAYMENTS',
    PLATFORM_SETTINGS: 'PLATFORM_SETTINGS',
};

export const RESOURCE_GROUP_MAP: Record<string, string> = {
    events: RESOURCE_GROUPS.EVENTS,
    eventTypes: RESOURCE_GROUPS.EVENTS,
    tickets: RESOURCE_GROUPS.PAYMENTS,
    reservations: RESOURCE_GROUPS.PAYMENTS,
    settings: RESOURCE_GROUPS.PLATFORM_SETTINGS,
};

export const ANSI_ESC = '\x1b[';
export const ANSI_RESET = ANSI_ESC + '0m';

export const ANSI_COLORS = {
    BLACK: ANSI_ESC + '30m',
    RED: ANSI_ESC + '31m',
    GREEN: ANSI_ESC + '32m',
    YELLOW: ANSI_ESC + '33m',
    BLUE: ANSI_ESC + '34m',
    MAGENTA: ANSI_ESC + '35m',
    CYAN: ANSI_ESC + '36m',
    WHITE: ANSI_ESC + '37m',
    BRIGHTBLACK: ANSI_ESC + '90m',
    BRIGHTRED: ANSI_ESC + '91m',
    BRIGHTGREEN: ANSI_ESC + '92m',
    BRIGHTYELLOW: ANSI_ESC + '93m',
    BRIGHTBLUE: ANSI_ESC + '94m',
    BRIGHTMAGENTA: ANSI_ESC + '95m',
    BRIGHTCYAN: ANSI_ESC + '96m',
    BRIGHTWHITE: ANSI_ESC + '97m',
    BOLD: ANSI_ESC + '1m',
    UNDERLINE: ANSI_ESC + '4m',
    INVERSE: ANSI_ESC + '7m',
};
