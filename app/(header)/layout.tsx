import {Header} from '@/components/pages/Common/Header';

export default function HeaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full">
            <Header />
            {children}
        </div>
    );
}
