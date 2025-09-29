import Link from 'next/link';
import {getCurrentSession} from '@/app/auth/actions';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {HeaderUserAvatarPopover} from './HeaderUserAvatarPopover';

export async function HeaderActionList() {
    const {data: session} = await getCurrentSession();

    if (session) {
        return <HeaderUserAvatarPopover user={session.user} />;
    }

    return (
        <div>
            <Button className="text-md h-12 w-40 border border-white bg-amber-500 tracking-tight text-white/90 hover:bg-amber-500/90">
                <Link href={APP_ROUTES.auth.signup}>Signup</Link>
            </Button>
        </div>
    );
}
