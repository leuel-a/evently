import type {Metadata} from 'next';
import localFont from 'next/font/local';
import ComposeProviders from '@/components/ComposeProviders';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/sonner';
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

const kumbhSans = localFont({
    src: '../assets/fonts/kumbh_sans/KumbhSans_VariableFont.ttf',
    variable: '--font-kumbh-sans',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} ${kumbhSans.variable} font-kumbh bg-gray-100 antialiased`}>
                <ComposeProviders components={[SidebarProvider, QueryClientProvider, AuthProvider]}>
                    {children}
                    <Toaster />
                </ComposeProviders>
            </body>
        </html>
    );
}
