import type {ElementType} from 'react';

export interface MenuItem {
  title: string;
  url: string;
  icon: ElementType;
}

export interface MenuSidebarGroup {
  label: string;
  items: MenuItem[]
}
export type MenuSidebarGroups = MenuSidebarGroup[]

