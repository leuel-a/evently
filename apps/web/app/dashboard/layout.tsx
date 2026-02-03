'use client';

import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/blocks/AppSidebar';
import {DashboardHeader} from '@/components/pages/dashboard/Common/DashboardHeader';
import DashboardProviders from './providers';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    return (
        <DashboardProviders>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <main className="w-full">
                    <SidebarTrigger />
                    <div className="px-10 py-4">
                        <DashboardHeader />
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </DashboardProviders>
    );
}
