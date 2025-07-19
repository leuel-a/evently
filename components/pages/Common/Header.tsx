import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';

export function Header() {
    return (
        <header className="h-20 w-full bg-indigo-500 text-white">
            <div className="mx-auto flex h-full w-[125rem] items-center justify-between">
                <div>
                    <h1 className="cursor-pointer text-2xl select-none">
                        <Link href="/">Evently</Link>
                    </h1>
                </div>
                <div>
                    <Button className="text-md h-12 w-40 border border-white bg-amber-500 tracking-tight text-white/90 hover:bg-amber-500/90">
                        <Link href={APP_ROUTES.auth.signup}>Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export interface HeaderProps {}
