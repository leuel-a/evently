import {Footer} from '@/components/pages/(site)/Landing/Footer';
import {Header as SiteHeader} from '@/components/pages/common/Header';

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-8 w-full">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}
