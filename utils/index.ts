import lodashGet from 'lodash/get';
import type {ReadonlyHeaders} from 'next/dist/server/web/spec-extension/adapters/headers';
import type {GetEvensFunctionProps} from '@/app/(site)/actions';
import {RESOURCE_GROUP_MAP} from '@/config/constants';
import type {ResourceItems, ResourceItemsWithGroups} from '@/types/resources';
import {removeEmptyStringsFromArray} from './functions';
import {splitCamelCase, capitalizeFirstLetters, uppercaseFirstLetters} from './strings';

export function getResourceGroups(resources: ResourceItems): ResourceItemsWithGroups {
    const groups: ResourceItemsWithGroups = {};

    resources.forEach((resource) => {
        const group = RESOURCE_GROUP_MAP[resource.name] || 'Other';

        if (!lodashGet(groups, group, undefined)) groups[group] = [];
        groups[group].push(resource);
    });

    return groups;
}

export function getLabelForResourceGroup(group: string): string {
    const groupString = group.split('_').join(' ');
    return uppercaseFirstLetters(groupString);
}

export function getLabelForResource(resource: string): string {
    const resourceString = splitCamelCase(resource);
    const labelResource = capitalizeFirstLetters(resourceString);
    return labelResource.endsWith('s') ? labelResource.slice(0, -1) : labelResource;
}

export function getPathnameArray(pathname: string) {
    return removeEmptyStringsFromArray(pathname.split('/'));
}

export function getOriginUrl(headers: ReadonlyHeaders) {
    return `${headers.get('x-forwarded-proto') ?? 'https'}://${headers.get('host')}`;
}
