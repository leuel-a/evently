import lodashIsEmpty from 'lodash/isEmpty';
import {ZodEffects, ZodObject} from 'zod';

export function removeEmptyStringsFromArray<T>(array: Array<T>) {
    return array.filter((value) => !lodashIsEmpty(value));
}

export function checkIfRelativeLink(candidate: string) {
    return /^\/[^\s]*$/.test(candidate);
}

export function convertObjectToFormData(object: Object) {
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    return formData;
}

export function convertFormDataToObject(formData: FormData) {
    return Object.fromEntries(Array.from(formData.entries()).map(([k, v]) => [k, v.toString()])) as Record<string, string>;
}

export function getValuesFromObjectBasedOnSchema(object: Object, inputSchema: ZodEffects<ZodObject<any>>) {
    const eventsSchemaKeys = Object.keys(inputSchema._def.schema.shape);
    return Object.fromEntries(Object.entries(object).filter(([key]) => eventsSchemaKeys.includes(key)));
}
