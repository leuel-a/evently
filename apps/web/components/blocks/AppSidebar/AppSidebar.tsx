'use client';

import {LayoutDashboard, Calendar, Settings} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';
import {Sidebar, SidebarContent, SidebarHeader} from '@/components/ui/sidebar';
import {AppSidebarMenu} from './AppSidebarMenu';
import {AppSidebarGroupMenu} from './AppSidebarGroupMenu';
import {Resource} from './types';
import {useSession} from '@/lib/auth';
import {UserAvatarMenu} from '../Common/UserAvatar';

const groups = Object.freeze({
    independent: 'independent',
    events: 'events',
    settings: 'settings',
});

const resources: Resource[] = [
    {
        title: 'Dashboard',
        url: APP_ROUTES.dashboard.base,
        icon: LayoutDashboard,
        group: groups.independent,
    },
    {
        title: 'Events',
        url: APP_ROUTES.dashboard.events.base,
        icon: Calendar,
        group: groups.events,
    },
    {
        title: 'Account',
        url: APP_ROUTES.dashboard.settings.accounts,
        icon: Settings,
        group: groups.settings,
    },
];

export function AppSidebar() {
    const {data} = useSession();
    const independentResources = resources.filter((value) => value.group === groups.independent);

    return (
        <Sidebar>
            <SidebarHeader>{data && <UserAvatarMenu data={data} />}</SidebarHeader>
            <SidebarContent>
                {independentResources.map((resource) => (
                    <AppSidebarMenu key={resource.url} resource={resource} />
                ))}
                {Object.values(groups)
                    .filter((group) => group !== groups.independent)
                    .map((group) => (
                        <AppSidebarGroupMenu key={group} resources={resources} group={group} />
                    ))}
            </SidebarContent>
        </Sidebar>
    );
}
