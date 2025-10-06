import {LayoutDashboard} from 'lucide-react';
import NextLink from 'next/link';
import {SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar} from '@/components/ui/sidebar';
import {APP_ROUTES} from '@/config/routes';
import {cn} from '@/lib/utils';

export function SidebarDashboardMenu() {
    const {state} = useSidebar();
    return (
        <SidebarMenu className={cn('mt-2', state === 'collapsed' ? 'gap-2' : '')}>
            <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer pl-4 py-2">
                    <LayoutDashboard />
                    <NextLink
                        className="text-lg"
                        href={APP_ROUTES.dashboard.base}
                    >
                        <span>{'Dashboard'}</span>
                    </NextLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
