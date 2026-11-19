'use client';

import { resources } from '@/config/resource-defnitions';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResourcesProvider } from '@/context/ResourcesContext';
import { ResourceProvider } from '@/context/ResourceContext';
import { GetDashboardSettingsApiResponse } from '@/types/settings';
import { DashboardSettingsProvider } from '@/context/DashboardSettingsContext';

export type DashboardProvidersProps = Readonly<{
    children: React.ReactNode;
    categories?: GetDashboardSettingsApiResponse ['categories'];
    tickets?: GetDashboardSettingsApiResponse['tickets'];
}>;

export default function DashboardProviders(props: DashboardProvidersProps) {
    const { children, tickets, categories } = props;
    return (
        <DashboardSettingsProvider categories={categories} tickets={tickets}>
            <ResourcesProvider resources={resources}>
                <ResourceProvider>
                    <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
                </ResourceProvider>
            </ResourcesProvider>
        </DashboardSettingsProvider>
    );
}
