'use client';

import {useRouter} from 'next/navigation';
import NextLink from 'next/link';
import {APP_ROUTES} from '@/config/routes';
import {Button} from '@/components/ui/button';
import {authClient} from '@/lib/auth';
import {GetSessionResult} from '@/app/events/actions';
import {PublicUserAvatar} from './PublicUserAvatar';

interface IAuthenticatedUser {
    data?: GetSessionResult;
}

export function AuthenticatedUser(props: IAuthenticatedUser) {
    const router = useRouter();

    const {data} = props;
    const generate = (path: string) => `${path}?organizer=false`;

    const onSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    if (data?.user) {
        return <PublicUserAvatar user={data?.user} onSignOut={onSignOut} />;
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                className="text-sm text-slate-600 hover:text-slate-900"
                asChild
            >
                <NextLink href={generate(APP_ROUTES.auth.login)}>Sign in</NextLink>
            </Button>
            <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md"
                asChild
            >
                <NextLink href={generate(APP_ROUTES.auth.signup)}>Sign up</NextLink>
            </Button>
        </div>
    );
}
