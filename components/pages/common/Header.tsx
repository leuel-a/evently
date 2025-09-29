import Link from 'next/link';
import {APP_ROUTES} from '@/config/routes';
import {HeaderActionList} from './HeaderActionList';

export async function Header() {
    return (
        <header className="sticky top-0 h-16 w-full bg-indigo-500 text-white">
            <div className="mx-auto flex h-full w-5/6 items-center justify-between">
                <div>
                    <h1 className="cursor-pointer select-none text-2xl">
                        <Link href={APP_ROUTES.events.base}>Evently</Link>
                    </h1>
                </div>
                <HeaderActionList />
            </div>
        </header>
    );
}

export interface HeaderProps {}
