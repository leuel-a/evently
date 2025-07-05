'use client';

import {Calendar} from 'lucide-react';
import {Sidebar, SidebarContent} from '@/components/ui/sidebar';
import {AppSidebarGroup} from './sidebar-group';
import type {MenuSidebarGroups} from './types';

const menuSidebarGroups: MenuSidebarGroups = [
    {
        label: 'events',
        items: [
            {
                title: 'Events',
                url: '/dashboard/events',
                icon: Calendar,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible='icon'>
            <SidebarContent>
                {menuSidebarGroups.map((group) => {
                    const {label, items} = group;

                    return (
                        <AppSidebarGroup
                            key={label}
                            label={label}
                            items={items}
                        />
                    );
                })}
            </SidebarContent>
        </Sidebar>
    );
}
