'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {DashboardHeader} from '@/components/pages/dashboard';
import {AppSidebar} from '@/components/pages/dashboard/Common';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {resources} from '@/config/resource-definitions';
import {APP_ROUTES} from '@/config/routes';
import {useAuthContext} from '@/context/AuthContext';
import {ResourceProvider} from '@/context/ResourceContext';
import {ResourcesProvider} from '@/context/ResourcesContext';

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const router = useRouter();

    const {isAuthenticated} = useAuthContext();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push(APP_ROUTES.auth.login);
    //     }
    // }, [isAuthenticated]);

    // if (!isAuthenticated) return <></>;

    return (
        <ResourcesProvider resources={resources}>
            <ResourceProvider>
                <div className="flex w-full flex-row">
                    <AppSidebar />
                    <main className="flex-1">
                        <SidebarTrigger />
                        <div className="h-full px-8">
                            <DashboardHeader />
                            {children}
                        </div>
                    </main>
                </div>
            </ResourceProvider>
        </ResourcesProvider>
    );
}
