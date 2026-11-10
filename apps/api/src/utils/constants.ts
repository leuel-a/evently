export const ERROR_LOG_TYPES = {
    DEFAULT: 'Default',
    VALIDATION: 'Validation',
};

export enum ApiErrorCode {
    // Validation
    VALIDATION_FAILED = 'VALIDATION_FAILED',

    // Events
    EVENT_NOT_FOUND = 'Event not found',
    EVENT_USER_NOT_AUTHORIZED = 'Forbidden',
}
