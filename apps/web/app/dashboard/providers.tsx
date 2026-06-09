'use client';

import {resources} from '@/config/resource-defnitions';
import {SidebarProvider} from '@/components/ui/sidebar';
import {ResourcesProvider} from '@/context/ResourcesContext';
import {ResourceProvider} from '@/context/ResourceContext';
import {SettingsApiResponse} from '@/types/settings';
import {DashboardSettingsProvider} from '@/context/DashboardSettingsContext';

export type DashboardProvidersProps = Readonly<{
    children: React.ReactNode;
    tickets?: SettingsApiResponse['tickets'];
}>;

export default function DashboardProviders(props: DashboardProvidersProps) {
    const {children, tickets} = props;
    return (
        <DashboardSettingsProvider tickets={tickets}>
            <ResourcesProvider resources={resources}>
                <ResourceProvider>
                    <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
                </ResourceProvider>
            </ResourcesProvider>
        </DashboardSettingsProvider>
    );
}

