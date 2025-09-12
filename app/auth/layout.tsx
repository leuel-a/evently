import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {APP_ROUTES} from '@/config/routes';
import {auth} from '@/lib/auth';

export default async function DashboardLayout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await auth.api.getSession({headers: await headers()});

    if (session && session.user) {
        return redirect(APP_ROUTES.base);
    }

    return <> {children} </>;
}
