'use client';

import {useResourcesContext} from '@/context/resources-context';
import {Sidebar, SidebarContent, useSidebar} from '@/components/ui/sidebar';
import {getResourceGroups, generateUniqueKey} from '@/utils';

import {AppSidebarGroup} from './sidebar-group';

function AppSidebar() {
    const resources = useResourcesContext();
    const resourceGroups = getResourceGroups(resources);
    const {state} = useSidebar();

    return (
        <Sidebar collapsible="icon">
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
