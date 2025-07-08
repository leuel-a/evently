'use client';

import {usePathname} from 'next/navigation';
import {AppSidebar} from '@/components/blocks/app-sidebar';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {DashboardHeader} from '@/components/pages/dashboard';
import {ResourcesProvider} from '@/context/resources-context';
import {resources} from '@/config/resource-definitions';
import {ResourceProvider} from '@/context/resource-context';

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname();
    const shouldShowCreateButton = !pathname.split('/').includes('create');

    return (
        <ResourcesProvider resources={resources}>
            <ResourceProvider>
                <div className="flex w-full flex-row">
                    <AppSidebar />
                    <main className="flex-1">
                        <SidebarTrigger />
                        <div className="px-8 pt-2">
                            <DashboardHeader shouldShowCreateButton={shouldShowCreateButton} />
                            {children}
                        </div>
                    </main>
                </div>
            </ResourceProvider>
        </ResourcesProvider>
    );
}
