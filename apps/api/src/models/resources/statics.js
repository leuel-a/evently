import {getResourcesProjection} from './utils.js';

/**
 * @this {import('mongoose').Model}
 */
export async function createResource(payload) {
    return this.create(payload);
}

/** @this {import('mongoose').Model}
 */
export async function getResources() {
    const projection = getResourcesProjection();
    return this.find({}, projection);
}
