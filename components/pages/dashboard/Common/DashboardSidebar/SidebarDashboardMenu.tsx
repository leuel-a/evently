import {LayoutDashboard} from 'lucide-react';
import NextLink from 'next/link';
import {usePathname} from 'next/navigation';
import {SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar} from '@/components/ui/sidebar';
import {APP_ROUTES} from '@/config/routes';
import {cn} from '@/lib/utils';
import {getResourceFromPathname} from '@/utils/functions';

export function SidebarDashboardMenu() {
    const {state} = useSidebar();
    const pathname = usePathname();
    const isDasboardPage = getResourceFromPathname(pathname, '', true);

    console.log({isDasboardPage});

    return (
        <SidebarMenu className={cn('mt-2', state === 'collapsed' ? 'gap-2' : '')}>
            <SidebarMenuItem>
                <SidebarMenuButton
                    className={cn(
                        'cursor-pointer rounded pl-4 py-2 h-12',
                        isDasboardPage
                            ? 'border-2 border-white bg-indigo-500 text-white hover:text-white hover:bg-indigo-600/80'
                            : '',
                    )}
                >
                    <LayoutDashboard />
                    <NextLink href={APP_ROUTES.dashboard.base}>
                        <span>{'Dashboard'}</span>
                    </NextLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
