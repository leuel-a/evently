'use client';

import {resources} from '@/config/resource-defnitions';
import {SidebarProvider} from '@/components/ui/sidebar';
import {ResourcesProvider} from '@/context/ResourcesContext';
import {ResourceProvider} from '@/context/ResourceContext';

export default function DashboardProviders({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ResourcesProvider resources={resources}>
            <ResourceProvider>
                <SidebarProvider defaultOpen={false}>
                    {children}
                </SidebarProvider>
            </ResourceProvider>
        </ResourcesProvider>
    );
}
