'use client';

import {useRouter} from 'next/navigation';
import {LayoutDashboard, Calendar, Settings, TicketCheck, UserCogIcon} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';
import {Sidebar, SidebarContent, SidebarHeader} from '@/components/ui/sidebar';
import {AppSidebarMenu} from './AppSidebarMenu';
import {AppSidebarGroupMenu} from './AppSidebarGroupMenu';
import {Resource} from './types';
import {authClient, useSession} from '@/lib/auth';
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
        title: 'General',
        url: APP_ROUTES.dashboard.settings.general,
        icon: UserCogIcon,
        group: groups.settings,
    },
    {
        title: 'Tickets',
        url: APP_ROUTES.dashboard.tickets.base,
        icon: TicketCheck,
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
    const router = useRouter();
    const {data} = useSession();
    const independentResources = resources.filter((value) => value.group === groups.independent);

    const onSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    const onProfile = async () => {
        router.push(APP_ROUTES.dashboard.settings.general);
    };

    return (
        <Sidebar>
            <SidebarHeader>
                {data && <UserAvatarMenu data={data} onSignOut={onSignOut} onProfile={onProfile} />}
            </SidebarHeader>
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
