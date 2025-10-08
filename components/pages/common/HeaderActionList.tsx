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
        <div className="flex items-center space-x-4">
            {/* Sign In Link */}
            <Link
                href={APP_ROUTES.auth.login}
                className="text-zinc-300 hover:text-white transition-colors duration-300 text-lg font-medium hidden sm:block"
            >
                Sign In
            </Link>

            <Button
                asChild
                className="relative bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group overflow-hidden min-w-[140px] h-12"
            >
                <Link href={APP_ROUTES.auth.signup}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                    <span className="relative z-10 tracking-tight">Sign Up</span>

                    <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-xl group-hover:bg-indigo-400/30 transition-all duration-300 -z-10" />
                </Link>
            </Button>
        </div>
    );
}
