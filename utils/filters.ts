import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashUnset from 'lodash/unset';
import {ReadonlyURLSearchParams} from 'next/navigation';
import {GetEvensFunctionProps} from '@/app/(site)/actions';
import type {FilterParams} from '@/types/utils/Filters';

export const FILTERS_PARAM_KEY = 'filters';
export const PAGE_PARAM_KEY = 'page';
export const LIMIT_PARAM_KEY = 'limit';

export function getValueFromFilterParam(
    params: URLSearchParams,
    key: string,
): FilterParams[keyof FilterParams] {
    return JSON.parse(
        lodashGet(Object.fromEntries(params.entries()), `${FILTERS_PARAM_KEY}.${key}`, '[]'),
    );
}

export function setValueToFilterParams(
    params: URLSearchParams,
    key: string,
    value: string | string[],
): URLSearchParams {
    const paramsObject = Object.fromEntries(params.entries());
    const filterValue = getValueFromFilterParam(params, key);
    const valuesToAdd = Array.isArray(value) ? value : [value];

    valuesToAdd.forEach((value) => {
        if (!filterValue.includes(value)) {
            filterValue.push(value);
        }
    });

    lodashSet(
        paramsObject,
        `${FILTERS_PARAM_KEY}.${key}`,
        filterValue,
        // filterValue.includes(value) ? filterValue : [...filterValue, value],
    );

    return convertObjectToURLParams(paramsObject);
}

export function removeValueFromFilterParams(
    params: URLSearchParams,
    key: string,
    value: string,
): URLSearchParams {
    const paramsObject = Object.fromEntries(params.entries());
    const filterValue = getValueFromFilterParam(params, key);

    const updated = filterValue.filter((currValue) => currValue !== value);
    lodashSet(paramsObject, `${FILTERS_PARAM_KEY}.${key}`, JSON.stringify(updated));

    return convertObjectToURLParams(paramsObject);
}

export function convertObjectToURLParams(filterObj: Object) {
    const params = new URLSearchParams();

    Object.entries(filterObj).forEach(([key, value]) => {
        if (key === FILTERS_PARAM_KEY) {
            params.set(key, JSON.stringify(value));
        } else {
            params.set(key, value);
        }
    });
    return params;
}

export function removePropertyFromFilter(params: URLSearchParams, keyToBeRemoved: string) {
    const newParams = new URLSearchParams();

    params.entries().forEach(([key, value]) => {
        if (key === FILTERS_PARAM_KEY) {
            try {
                const newFilters: FilterParams = {};
                const filters = JSON.parse(value) as FilterParams;

                Object.entries(filters).forEach(([key, value]) => {
                    if (key !== keyToBeRemoved) {
                        newFilters[key] = value;
                    }
                });

                if (Object.keys(newFilters).length > 0) {
                    newParams.set(FILTERS_PARAM_KEY, JSON.stringify(newFilters));
                }
            } catch (error) {
                // TODO: Figure out what to do if it fails
            }
        }
    });
    return newParams;
}

export function createNewPageParams(
    currPage: number,
    limit: number,
    prevParams: ReadonlyURLSearchParams,
) {
    const newParams = new URLSearchParams(prevParams.toString());

    newParams.set('page', `${currPage}`);
    newParams.set('limit', `${limit}`);

    return newParams;
}

export function getPageFromSearchParams(params: URLSearchParams, defaultValue: string = '1') {
    const paramsObj = Object.fromEntries(params.entries());
    return parseInt(lodashGet(paramsObj, PAGE_PARAM_KEY, defaultValue));
}

export function getLimitFromSearchParams(params: URLSearchParams, defaultValue: string = '6') {
    const paramsObj = Object.fromEntries(params.entries());
    return parseInt(lodashGet(paramsObj, LIMIT_PARAM_KEY, defaultValue));
}

export function getPageFromPageParam(params: GetEvensFunctionProps, defaultValue: string = '1') {
    return parseInt(lodashGet(params, PAGE_PARAM_KEY, defaultValue));
}

export function getLimitFromPageParam(params: GetEvensFunctionProps, defaultValue: string = '6') {
    return parseInt(lodashGet(params, LIMIT_PARAM_KEY, defaultValue));
}
