import {Footer} from '@/components/pages/(site)/Landing/Footer';
import {Header as SiteHeader} from '@/components/pages/common/Header';

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1 bg-white dark:bg-zinc-900">{children}</main>
            <Footer />
        </div>
    );
}
