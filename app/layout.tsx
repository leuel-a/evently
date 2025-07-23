import type {Metadata} from 'next';
import localFont from 'next/font/local';
import ComposeProviders from '@/components/ComposeProviders';
import {SidebarProvider} from '@/components/ui/sidebar';
import {AuthProvider} from '@/context/AuthContext';
import {QueryClientProvider} from '@/context/QueryClientContext';
import './globals.css';

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
                <ComposeProviders components={[SidebarProvider, QueryClientProvider, AuthProvider]}>{children}</ComposeProviders>
            </body>
        </html>
    );
}
