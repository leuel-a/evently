import {Footer} from '@/components/pages/common/Footer';
import {Header} from '@/components/pages/common/Header';

export default function HeaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col gap-8 w-full">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}
