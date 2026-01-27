import {AppSidebarMenu} from './AppSidebarMenu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
} from '@/components/ui/sidebar';
import {capitalizeFirstLetter} from '@/lib/utils';
import { Resource } from './types';

interface AppSidebarGroupMenuProps {
    group: string
    resources: Resource[]
}

export function AppSidebarGroupMenu({resources, group}: AppSidebarGroupMenuProps) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{capitalizeFirstLetter(group)}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {resources
                        .filter((resource) => resource.group === group)
                        .map((resource) => (
                            <AppSidebarMenu key={resource.url} resource={resource} />
                        ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
