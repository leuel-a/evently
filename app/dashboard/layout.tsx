import {AppSidebar} from '@/components/blocks/app-sidebar';
import {SidebarTrigger} from '@/components/ui/sidebar';

export default async function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="flex flex-row">
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <div className="pt-6 pl-8">{children}</div>
            </main>
        </div>
    );
}
