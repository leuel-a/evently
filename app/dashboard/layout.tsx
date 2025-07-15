'use client';

import {Suspense} from 'react';
import {usePathname} from 'next/navigation';

import {AppSidebar} from '@/components/pages/dashboard/Common';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {DashboardHeader} from '@/components/pages/dashboard';
import {ResourcesProvider} from '@/context/ResourcesContext';
import {resources} from '@/config/resource-definitions';
import {ResourceProvider} from '@/context/ResourceContext';

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const pathname = usePathname();
    const shouldShowCreateButton = !pathname.split('/').includes('create');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResourcesProvider resources={resources}>
                <ResourceProvider>
                    <div className="flex w-full flex-row">
                        <AppSidebar />
                        <main className="flex-1">
                            <SidebarTrigger />
                            <div className="h-full px-8">
                                <DashboardHeader shouldShowCreateButton={shouldShowCreateButton} />
                                {children}
                            </div>
                        </main>
                    </div>
                </ResourceProvider>
            </ResourcesProvider>
        </Suspense>
    );
}
