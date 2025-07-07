import type {ElementType} from 'react';

export interface ResourceItem {
    name: string;
    label?: string;
    icon: ElementType;
}

export type ResourceItems = ResourceItem[];

export type ResourceItemsWithGroups = {
    [key: string]: ResourceItems;
};
