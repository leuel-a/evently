'use client';

import NextLink from 'next/link';
import {usePathname} from 'next/navigation';
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
import {cn} from '@/lib/utils';
import type {ResourceItems} from '@/types/resources';
import {getLabelForResource} from '@/utils';
import {getLabelForResourceGroup} from '@/utils';
import {getResourceFromPathname} from '@/utils/functions';

function SidebarAppGroup(props: SidebarAppGroupProps) {
    const pathname = usePathname();
    const {label, resources: items} = props;
    const {state} = useSidebar();

    return (
        <SidebarGroup>
            {state !== 'collapsed' && (
                <SidebarGroupLabel className={`capitalize`}>
                    {getLabelForResourceGroup(label)}
                </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={`${state === 'expanded' ? '' : 'gap-0'}`}>
                <SidebarMenu className={state === 'collapsed' ? 'gap-2' : ''}>
                    {items.map((item) => {
                        const {name: resource} = item;
                        const url = `/${DASHBOARD_PREFIX}/${resource}`;
                        const isCurrResource = getResourceFromPathname(pathname, resource);

                        return (
                            <SidebarMenuItem key={url}>
                                <SidebarMenuButton
                                    className={cn(
                                        'cursor-pointer rounded py-2 h-12',
                                        isCurrResource
                                            ? 'border-2 border-white bg-indigo-500 text-white hover:text-white hover:bg-indigo-600/80'
                                            : '',
                                    )}
                                >
                                    <item.icon />
                                    <NextLink
                                        key={url}
                                        href={url}
                                    >
                                        {getLabelForResource(resource)}
                                    </NextLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export interface SidebarAppGroupProps {
    label: string;
    resources: ResourceItems;
}

SidebarAppGroup.displayName = 'DashboardSidebarGroup';
export {SidebarAppGroup};
