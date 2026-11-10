import type { ElementType } from 'react';

// this is not the same as the @evently/models/resource Model, this is used
// for the dashboard, check implemetation in AppSidebar.tsx
export interface ResourceItem {
    name: string;
    label?: string;
    icon: ElementType;
    hasCreate?: boolean;
}

export type ResourceItems = ResourceItem[];

export type ResourceItemsWithGroups = {
    [key: string]: ResourceItems;
};
