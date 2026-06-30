import {redirect} from 'next/navigation';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/blocks/AppSidebar';
import {DashboardHeader} from '@/components/pages/Dashboard/Common/DashboardHeader';
import {getDashboardSettings, getSession} from './actions';
import DashboardProviders from './providers';
import {APP_ROUTES} from '@/config/routes';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({children}: DashboardLayoutProps) {
    const {success: getSessionSuccess, error: getSessionError} = await getSession();
    const {data: getDashboardSettingsData} = await getDashboardSettings();

    if (!getSessionSuccess || getSessionError) {
        return redirect(`${APP_ROUTES.auth.login}?organizer=true`);
    }

    return (
        <DashboardProviders tickets={getDashboardSettingsData?.tickets}>
            <AppSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <div className="px-10 py-4">
                    <DashboardHeader />
                    {children}
                </div>
            </main>
        </DashboardProviders>
    );
}
