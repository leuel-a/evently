'use client';

import Link from 'next/link';
import {Sidebar, SidebarContent, SidebarHeader, useSidebar} from '@/components/ui/sidebar';
import {APP_ROUTES} from '@/config/routes';
import {useResourcesContext} from '@/context/ResourcesContext';
import {getResourceGroups, generateUniqueKey} from '@/utils';
import {AppSidebarGroup} from './SidebarGroup';

function AppSidebar() {
    const resources = useResourcesContext();
    const resourceGroups = getResourceGroups(resources);
    const {state} = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link
                    href={APP_ROUTES.index.home}
                    className="text-2xl tracking-tighter"
                >
                    Evently
                </Link>
            </SidebarHeader>
            <SidebarContent className={`${state === 'collapsed' ? 'gap-0' : ''}`}>
                {Object.entries(resourceGroups).map(([groupLabel, resources]) => {
                    return (
                        <AppSidebarGroup
                            key={generateUniqueKey()}
                            label={groupLabel}
                            resources={resources}
                        />
                    );
                })}
            </SidebarContent>
        </Sidebar>
    );
}

AppSidebar.displayName = 'DashboardSidebar';
export {AppSidebar};
