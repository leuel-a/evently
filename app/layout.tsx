import localFont from 'next/font/local';
import type {Metadata} from 'next';
import './globals.css';

import {Header} from '@/components/pages/Common/Header';
import ComposeProviders from '@/components/ComposeProviders';
import {AuthProvider} from '@/context/AuthContext';
import {SidebarProvider} from '@/components/ui/sidebar';
import {QueryClientProvider} from '@/context/QueryClientContext';

export const metadata: Metadata = {
    title: 'Evently',
    description: 'Disover your events with ease',
};

const poppins = localFont({
    src: '../assets/fonts/poppins/Poppins-Regular.ttf',
    variable: '--font-poppins',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={`${poppins.variable} font-poppins bg-gray-100`}>
                <ComposeProviders components={[SidebarProvider, QueryClientProvider, AuthProvider]}>
                    <div className="flex flex-col w-full">
                        <Header />
                        {children}
                    </div>
                </ComposeProviders>
            </body>
        </html>
    );
}
