import lodashIsEmpty from 'lodash/isEmpty';
import {APP_ROUTES} from '@/config/routes';

export function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

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
    return Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => [k, v.toString()]),
    ) as Record<string, string>;
}

export function getResourceFromPathname(
    pathname: string,
    currResource: string,
    isDashboard: boolean = false,
) {
    return !isDashboard
        ? !!removeEmptyStringsFromArray(pathname.split('/')).find((value) => value === currResource)
        : pathname === APP_ROUTES.dashboard.base;
}
