'use client';

import Link from 'next/link';
import {v4 as uuid} from 'uuid';
import {Sidebar, SidebarContent, SidebarHeader, useSidebar} from '@/components/ui/sidebar';
import {APP_ROUTES} from '@/config/routes';
import {useResourcesContext} from '@/context/ResourcesContext';
import {getResourceGroups} from '@/utils';
import {AppSidebarGroup} from './SidebarGroup';

function DashboardSidebar() {
    const resources = useResourcesContext();
    const resourceGroups = getResourceGroups(resources);
    const {state} = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link
                    href={APP_ROUTES.events.base}
                    className="text-2xl tracking-tighter"
                >
                    Evently
                </Link>
            </SidebarHeader>
            <SidebarContent className={`${state === 'collapsed' ? 'gap-0' : ''}`}>
                {Object.entries(resourceGroups).map(([groupLabel, resources]) => {
                    return (
                        <AppSidebarGroup
                            key={uuid()}
                            label={groupLabel}
                            resources={resources}
                        />
                    );
                })}
            </SidebarContent>
        </Sidebar>
    );
}

DashboardSidebar.displayName = 'DashboardSidebar';
export {DashboardSidebar};
