import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {useAuthContext} from '@/context/AuthContext';
import { HeaderUserAvatarPopover } from './HeaderUserAvatarPopover';

export function HeaderActionList() {
    const {isAuthenticated} = useAuthContext();

    if (isAuthenticated) {
        return <HeaderUserAvatarPopover />
    }

    return (
        <div>
            <Button className="text-md h-12 w-40 border border-white bg-amber-500 tracking-tight text-white/90 hover:bg-amber-500/90">
                <Link href={APP_ROUTES.auth.signup}>Sign Up</Link>
            </Button>
        </div>
    );
}
