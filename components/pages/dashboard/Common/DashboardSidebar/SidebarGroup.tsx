import Link from 'next/link';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';
import {DASHBOARD_PREFIX} from '@/config/constants';
import type {ResourceItems} from '@/types/resources';
import {getLabelForResource} from '@/utils';
import {getLabelForResourceGroup} from '@/utils';

function AppSidebarGroup(props: AppSidebarGroupProps) {
    const {label, resources: items} = props;
    const {state} = useSidebar();

    return (
        <SidebarGroup>
            {state !== 'collapsed' && (
                <SidebarGroupLabel className={`capitalize`}>
                    {getLabelForResourceGroup(label)}
                </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={`${state === 'expanded' ? 'pl-4' : 'gap-0'}`}>
                <SidebarMenu className={state === 'collapsed' ? 'gap-2' : ''}>
                    {items.map((item) => {
                        const {name: resource} = item;
                        const url = `/${DASHBOARD_PREFIX}/${resource}`;

                        return (
                            <SidebarMenuItem key={url}>
                                <SidebarMenuButton>
                                    <item.icon />
                                    <Link
                                        key={url}
                                        href={url}
                                    >
                                        {getLabelForResource(item.name)}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export interface AppSidebarGroupProps {
    label: string;
    resources: ResourceItems;
}

AppSidebarGroup.displayName = 'DashboardSidebarGroup';
export {AppSidebarGroup};
