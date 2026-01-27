import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import {AppSidebar} from '@/components/blocks/AppSidebar'

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                <div className="px-10 py-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
