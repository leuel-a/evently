'use client';

import Link from 'next/link';
import {APP_ROUTES} from '@/config/routes';
import {HeaderActionList} from './HeaderActionList';

export function Header() {
    return (
        <header className="h-20 w-full bg-indigo-500 text-white">
            <div className="mx-auto flex h-full w-5/6 items-center justify-between">
                <div>
                    <h1 className="cursor-pointer text-2xl select-none">
                        <Link href={APP_ROUTES.index.home}>Evently</Link>
                    </h1>
                </div>
                <HeaderActionList />
            </div>
        </header>
    );
}

export interface HeaderProps {}
