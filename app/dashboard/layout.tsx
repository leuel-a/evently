import {redirect} from 'next/navigation';
import {DashboardHeader} from '@/components/pages/dashboard';
import {DashboardSidebar} from '@/components/pages/dashboard/Common';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {APP_ROUTES} from '@/config/routes';
import {getCurrentSession} from '../auth/actions';
import Providers from './providers';

export default async function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await getCurrentSession();

    if (!session) {
        return redirect(APP_ROUTES.auth.login);
    }

    return (
        <Providers>
            <div className="flex w-full flex-row">
                <DashboardSidebar />
                <main className="flex-1">
                    <SidebarTrigger />
                    <div className="h-full px-8">
                        <DashboardHeader />
                        {children}
                    </div>
                </main>
            </div>
        </Providers>
    );
}
