import {LayoutDashboard, Calendar} from 'lucide-react';
import {APP_ROUTES} from '@/config/routes';
import {Sidebar, SidebarContent, SidebarHeader} from '@/components/ui/sidebar';
import {AppSidebarMenu} from './AppSidebarMenu';
import {AppSidebarGroupMenu} from './AppSidebarGroupMenu';
import {Resource} from './types';

const groups = Object.freeze({
    independent: 'independent',
    events: 'events',
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
];

export function AppSidebar() {
    const independentResources = resources.filter((value) => value.group === groups.independent);
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
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
