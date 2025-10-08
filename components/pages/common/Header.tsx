import Link from 'next/link';
import {ThemeToggleButton} from '@/components/blocks';
import {APP_ROUTES} from '@/config/routes';
import {HeaderActionList} from './HeaderActionList';

export async function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800/50 shadow-lg shadow-gray-200/10 dark:shadow-zinc-900/10">
            <div className="mx-auto flex h-20 w-full max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2">
                    <Link
                        href={APP_ROUTES.events.base}
                        className="group relative"
                    >
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-violet-800 to-indigo-700 bg-clip-text text-transparent tracking-tight transition-all duration-300 group-hover:scale-105">
                            Evently
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/20 to-violet-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggleButton />
                    <HeaderActionList />
                </div>
            </div>
        </header>
    );
}

export interface HeaderProps {}
