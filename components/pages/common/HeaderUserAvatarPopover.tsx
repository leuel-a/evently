import type {User} from 'better-auth';
import {LayoutDashboard, Settings} from 'lucide-react';
import NextLink from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';
import {cn} from '@/lib/utils';
import {LogoutUserButton} from './LogoutUserButton';

interface HeaderUserAvatarPopoverProps {
    user: User;
}

export function HeaderUserAvatarPopover({user}: HeaderUserAvatarPopoverProps) {
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((part) => part.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/50 transition-all duration-300 group"
                >
                    <span className="text-gray-700 dark:text-white font-medium text-sm hidden sm:block">
                        {user.name}
                    </span>
                    <Avatar className="w-10 h-10 aspect-square border-2 border-gray-300 dark:border-zinc-700 group-hover:border-indigo-500 transition-colors duration-300">
                        <AvatarImage
                            src={user.image ?? undefined}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold">
                            {getUserInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-64 p-4 rounded-2xl bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl border border-gray-200 dark:border-zinc-700 shadow-2xl shadow-black/50"
                align="end"
                sideOffset={8}
            >
                <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-100 dark:bg-zinc-700/30">
                    <Avatar className="w-12 h-12 border-2 border-indigo-500/30">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-semibold text-lg">
                            {getUserInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white font-semibold text-sm truncate">
                            {user.name}
                        </p>
                        <p className="text-gray-600 dark:text-zinc-400 text-xs truncate">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="space-y-1">
                    <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start gap-3 h-11 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-all duration-200"
                    >
                        <NextLink href={APP_ROUTES.dashboard.events.base}>
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </NextLink>
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start gap-3 h-11 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-all duration-200"
                    >
                        <NextLink href={APP_ROUTES.dashboard.base}>
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </NextLink>
                    </Button>
                    <div className="h-px bg-gray-200 dark:bg-zinc-700 my-2" />
                    <LogoutUserButton />
                </div>
            </PopoverContent>
        </Popover>
    );
}
