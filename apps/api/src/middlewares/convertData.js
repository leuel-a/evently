import lodashGet from 'lodash/get.js';

/**
 * Recursively transforms a MongoDB document or array of documents by:
 * - converting `_id` → `id` (as string)
 * - removing `__v`
 * - deeply processing nested objects/arrays
 *
 * @param {any} document - Any MongoDB document, plain object, array, or primitive
 * @returns {any} A transformed copy of the original data
 */
export function transform(document) {
    if (Array.isArray(document)) {
        return document.map((item) => transform(item));
    }

    if (document && typeof document === 'object') {
        const object = {};
        const documentEntries = Object.entries(document);

        for (const [key] of documentEntries) {
            const value = lodashGet(document, key);

            if (key === '_id') {
                object.id = value?.toString();
            } else if (key === '__v') {
                continue;
            } else {
                object[key] = transform(value);
            }
        }

        return object;
    }

    return document;
}

/** @type {import('express').RequestHandler} */
export async function convertData(_req, res, next) {
    console.log('Convert Data Middleware');
    const data = lodashGet(res.locals, 'data', undefined);

    if (data) {
        res.locals.data = transform(data);
    }
    next();
}
