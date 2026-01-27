import createError from 'http-errors';

/**
 * Create an HTTP error with status, message, and extra details.
 *
 * @param {number} status - HTTP status code
 * @param {string} [message] - Error message
 * @param {object} [details] - Extra error details
 * @returns {import('http-errors').HttpError}
 */
export function httpError(status, message, details) {
    const error = createError(status, message);

    if (details) {
        error.details = details;
    }

    return error;
}
