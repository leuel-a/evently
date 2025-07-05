import Link from 'next/link';
import {SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import type {MenuItem} from './types';

export function AppSidebarGroup(props: AppSidebarGroupProps) {
    const {label, items} = props;

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="capitalize">{label}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        return (
                            <SidebarMenuItem key={item.url}>
                                <SidebarMenuButton>
                                    <item.icon />
                                    <Link
                                        key={item.url}
                                        href={item.url}
                                    >
                                        {item.title}
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
    items: MenuItem[];
}
