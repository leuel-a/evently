import lodashGet from 'lodash/get';
import {v4 as uuid} from 'uuid';
import {splitCamelCase, capitalizeFirstLetters, uppercaseFirstLetters} from './strings';
import {RESOURCE_GROUP_MAP} from '@/config/constants';
import type {ResourceItems, ResourceItemsWithGroups} from '@/types/resources';

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
    return capitalizeFirstLetters(resourceString);
}

export function generateUniqueKey() {
    // TODO: figure out a less resource intensive function to generate a unique key
    return uuid();
}
